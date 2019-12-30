import {
  FullDefAnon,
  AlgolLinkAnon,
  AlgolLinkInnerAnon,
  AlgolEffectActionDefAnon,
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
  const actionDef: AlgolEffectActionDefAnon =
    gameDef.flow.commands[action] ||
    gameDef.flow.marks[action] ||
    (action === "startTurn" && gameDef.flow.startTurn) ||
    {}; // To allow tests to reference non-existing things
  const parser = makeParser(gameDef, player, action);
  if (gameDef && gameDef.flow.commands && gameDef.flow.commands[name]) {
    // ------------- Linking to a command
    return `
      LINKS.commands.${name} = '${name + player}';
    `;
  } else if (gameDef && gameDef.flow.marks && gameDef.flow.marks[name]) {
    // ------------- Linking to a mark
    const markDef = gameDef.flow.marks[name];
    return `
    for(const pos of Object.keys(${parser.set(markDef.from)})) {
      LINKS.marks[pos] = '${name + player}';
    }
`;
  } else if (name === "endTurn") {
    // ------------- Linking to next turn, have to check win conditions
    return Object.entries(gameDef.flow.endGame || {})
      .filter(
        ([name, def]) =>
          def.unlessAction !== action &&
          !actionDef.noEndGame &&
          (!def.ifPlayer || def.ifPlayer === player)
      )
      .sort(([, d1], [, d2]) => (d1.whenStarvation ? 1 : -1))
      .map(([name, def]) => {
        const winnerCode = parser.val(def.who === undefined ? player : def.who);
        const winnerNumber = Number(winnerCode);
        let winner;
        if (isNaN(winnerNumber)) {
          winner =
            (player === 1
              ? '["draw", "win", "lose"]'
              : '["draw", "lose", "win"]') + `[${winnerCode}]`;
        } else {
          winner =
            player === winnerNumber
              ? "'win'"
              : winnerNumber === 0
              ? "'draw'"
              : "'lose'";
        }
        let code = "";
        if (!def.whenStarvation) {
          code += `
          LINKS.endGame = ${winner};
          LINKS.endedBy = '${name}';
          ${
            def.show
              ? `LINKS.endMarks = Object.keys(${parser.set(def.show)});`
              : ""
          }`;
        } else {
          code += `LINKS.starvation = {
            endGame: ${winner},
            endedBy: '${name}',
            ${def.show ? `endMarks: Object.keys(${parser.set(def.show)})` : ""}
          }
          LINKS.endTurn = "startTurn${player === 1 ? 2 : 1}";
          `;
        }
        return `if (${parser.bool(def.condition)}) { ${code} }`;
      })
      .concat(`{ LINKS.endTurn = "startTurn${player === 1 ? 2 : 1}"; }`)
      .join(" else ");
  } else {
    throw "Unknown link: " + name;
  }
}
