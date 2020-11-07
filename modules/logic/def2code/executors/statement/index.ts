import {
  FullDefAnon,
  AlgolStatementAnon,
  isAlgolStatementIfElse,
  isAlgolStatementIfActionElse,
  isAlgolStatementPlayerCase,
  isAlgolStatementIf,
  isAlgolStatementIfPlayer,
  isAlgolStatementIfAction,
  isAlgolStatementIfRuleset,
  isAlgolStatementMulti,
  isAlgolStatementForPosIn,
  isAlgolStatementForIdIn,
  isAlgolValLoopRead,
  isAlgolStatementIfRulesetElse,
} from "../../../../types";
import { contains } from "../../../../common";
import { makeParser } from "../expression";

export function executeStatement<_T>(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  finalParser: (
    gameDef: FullDefAnon,
    player: 1 | 2,
    action: string,
    ruleset: string,
    statement: _T,
    from?: string
  ) => string,
  statement: AlgolStatementAnon<_T>,
  from?: string
): string {
  if (!ruleset) {
    console.error("STATEMENT", statement);
    throw new Error(
      `Statement executor didnt receive ruleset! Action: ${action}, Statement: ${JSON.stringify(
        statement
      )}`
    );
  }
  const exprParser = makeParser(gameDef, player, action, ruleset, from);
  const me = (expr: AlgolStatementAnon<_T>) =>
    executeStatement(gameDef, player, action, ruleset, finalParser, expr, from);

  if (isAlgolStatementIfElse(statement)) {
    const {
      ifelse: [test, whenTruthy, whenFalsy],
    } = statement;

    return `if (${exprParser.bool(test)}) { ${me(whenTruthy)} } else { ${me(
      whenFalsy
    )} }`;
  }

  if (isAlgolStatementIfActionElse(statement)) {
    const {
      ifactionelse: [testAction, whenYes, whenNo],
    } = statement;
    return me(testAction === action ? whenYes : whenNo);
  }

  if (isAlgolStatementIfRulesetElse(statement)) {
    const {
      ifrulesetelse: [testRuleset, whenYes, whenNo],
    } = statement;
    return me(testRuleset === ruleset ? whenYes : whenNo);
  }

  if (isAlgolStatementPlayerCase(statement)) {
    const {
      playercase: [plr1, plr2],
    } = statement;
    return me(player === 1 ? plr1 : plr2);
  }

  if (isAlgolStatementIf(statement)) {
    const {
      if: [test, val],
    } = statement;
    return `if (${exprParser.bool(test)}) { ${me(val)} }`;
  }

  if (isAlgolStatementIfPlayer(statement)) {
    const {
      ifplayer: [forPlayer, val],
    } = statement;
    return forPlayer === player ? me(val) : "";
  }

  if (isAlgolStatementIfAction(statement)) {
    const {
      ifaction: [forAction, val],
    } = statement;
    return forAction === action ? me(val) : "";
  }

  if (isAlgolStatementIfRuleset(statement)) {
    const {
      ifruleset: [forRuleset, val],
    } = statement;
    return forRuleset === ruleset ? me(val) : "";
  }

  if (isAlgolStatementMulti(statement)) {
    const { multi: children } = statement;
    return children.map(me).join(" ");
  }

  if (isAlgolStatementForPosIn(statement)) {
    const {
      forposin: [set, repeatStatement],
    } = statement;
    if (needsLoopSet(repeatStatement)) {
      return `{ const LOOPSET = ${exprParser.set(set)};
        for(let LOOPPOS in LOOPSET) { ${me(repeatStatement)} } }`;
    }
    return `for(let LOOPPOS in ${exprParser.set(set)}) { ${me(
      repeatStatement
    )} }`;
  }
  if (isAlgolStatementForIdIn(statement)) {
    const {
      foridin: [set, repeatEffect],
    } = statement;
    const setcode = exprParser.set(set);
    const safe = (setcode as string).substr(0, 10) === "UNITLAYERS";
    const loopInner = safe
      ? `let LOOPID = ${setcode}[LOOPPOS].id; ${me(repeatEffect)}`
      : `let LOOPID = (UNITLAYERS.units[LOOPPOS]||{}).id; if (LOOPID) { ${me(
          repeatEffect
        )} }`;
    return `for(let LOOPPOS in ${setcode}) { ${loopInner} }`;
  }

  return finalParser(gameDef, player, action, ruleset, statement, from);
}

function needsLoopSet(expr: any) {
  return contains(expr, checker);
}
const isLoopSet = (e: any) => {
  return Array.isArray(e) && e.length === 1 && e[0] === "loopset";
};
const checker = (e: any) => isLoopSet(e) || isAlgolValLoopRead(e);
