import {
  FullDefAnon,
  AlgolLinkAnon,
  AlgolLinkInnerAnon
} from "../../../../../types";

import { executeStatement, makeParser } from "../../../executors";

export function executeLink(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  link: AlgolLinkAnon
): string {
  return executeStatement(
    gameDef,
    player,
    action,
    executeLinkInner,
    link,
    "link"
  );
}

function executeLinkInner(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  name: AlgolLinkInnerAnon
): string {
  const parser = makeParser(gameDef, player, action);
  if (gameDef && gameDef.flow.commands && gameDef.flow.commands[name]) {
    // ------------- Linking to a command
    return `
      LINKS.actions.${name} = '${name + player}';
    `;
  } else if (gameDef && gameDef.flow.marks && gameDef.flow.marks[name]) {
    // ------------- Linking to a mark
    const markDef = gameDef.flow.marks[name];
    return `
    for(const pos of Object.keys(${parser.set(markDef.from)})) {
      LINKS.actions[pos] = '${name + player}';
    }
`;
  } else if (name === "endturn") {
    // ------------- Linking to next turn, have to check win conditions
    return Object.entries(gameDef.flow.endGame || {})
      .map(
        ([name, def]) => `
      if (${parser.bool(def.condition)}) { 
        let winner = ${parser.val(def.who === undefined ? player : def.who)};
        LINKS.endturn = winner === ${player} ? 'win' : winner ? 'lose' : 'draw';
        LINKS.endedBy = '${name}';
        ${
          def.show
            ? `LINKS.endMarks = Object.keys(${parser.set(def.show)});`
            : ""
        }
      }`
      )
      .concat(`{ LINKS.endturn = "start${player === 1 ? 2 : 1}"; }`)
      .join(" else ");
  } else {
    throw "Unknown link: " + name;
  }
}
