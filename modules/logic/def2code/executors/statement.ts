import {
  FullDefAnon,
  AlgolStatementAnon,
  isAlgolLogicalIfElse,
  isAlgolLogicalIfActionElse,
  isAlgolLogicalIndexList,
  isAlgolLogicalPlayerCase,
  isAlgolLogicalIf,
  isAlgolLogicalIfPlayer,
  isAlgolLogicalIfAction,
  isAlgolLogicalMulti
} from "../../../types";
import { makeParser } from "./expression";

export function executeStatement<_T>(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  finalParser: (
    gameDef: FullDefAnon,
    player: 1 | 2,
    action: string,
    statement: AlgolStatementAnon<_T>,
    from?: string
  ) => string,
  statement: AlgolStatementAnon<_T>,
  from
) {
  const exprParser = makeParser(gameDef, player, action, from);
  const me = expr =>
    executeStatement(gameDef, player, action, finalParser, expr, from);

  if (isAlgolLogicalIfElse(statement)) {
    const {
      ifelse: [test, whenTruthy, whenFalsy]
    } = statement;

    return `if (${exprParser.bool(test)}) { ${me(whenTruthy)} } else { ${me(
      whenFalsy
    )} }`;
  }

  if (isAlgolLogicalIfActionElse(statement)) {
    const {
      ifactionelse: [testAction, whenYes, whenNo]
    } = statement;
    return me(testAction === action ? whenYes : whenNo);
  }

  if (isAlgolLogicalPlayerCase(statement)) {
    const {
      playercase: [plr1, plr2]
    } = statement;
    return me(player === 1 ? plr1 : plr2);
  }

  if (isAlgolLogicalIndexList(statement)) {
    const {
      indexlist: [idx, ...opts]
    } = statement;
    const parsedIdx = exprParser.val(idx);
    if (typeof parsedIdx === "number") {
      return me(opts[parsedIdx]);
    }
    return `[${opts.map(me).join(", ")}][${parsedIdx}]`;
  }

  if (isAlgolLogicalIf(statement)) {
    const {
      if: [test, val]
    } = statement;
    return `if (${exprParser.bool(test)}) { ${me(val)} }`;
  }

  if (isAlgolLogicalIfPlayer(statement)) {
    const {
      ifplayer: [forPlayer, val]
    } = statement;
    return forPlayer === player ? me(val) : "";
  }

  if (isAlgolLogicalIfAction(statement)) {
    const {
      ifaction: [forAction, val]
    } = statement;
    return forAction === action ? me(val) : "";
  }

  if (isAlgolLogicalMulti(statement)) {
    const { multi: children } = statement;
    return children.map(me).join(" ");
  }
  return finalParser(gameDef, player, action, statement, from);
}
