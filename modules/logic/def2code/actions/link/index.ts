import makeParser from "../../expressions";
import { FullDefAnon } from "../../../../types";

export function executeLink(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  name: string
): string {
  const parser = makeParser(gameDef, player, action);
  const stepLinkLookup = action === "start" ? ".root" : "[newStepId]";
  if (gameDef && gameDef.flow.commands && gameDef.flow.commands[name]) {
    return `
      turn.links${stepLinkLookup}.${name} = '${name + player}';
    `;
  } else if (gameDef && gameDef.flow.marks && gameDef.flow.marks[name]) {
    const markDef = gameDef.flow.marks[name];
    return `
      let ${name}Links = turn.links${stepLinkLookup};
      for(let linkpos in ${parser.set(markDef.from)}){
        ${name}Links[linkpos] = '${name + player}';
      }
    `;
  } else if (name === "endturn") {
    return Object.entries(gameDef.flow.endGame || {})
      .map(
        ([name, def]) => `
      if (${parser.bool(def.condition)}) { 
        let winner = ${parser.val(def.who || player)};
        let result = winner === ${player} ? 'win' : winner ? 'lose' : 'draw';
        turn.links[newStepId][result] = '${name}';
        ${
          def.show
            ? `
        turn.endMarks[newStepId] = turn.endMarks[newStepId] || {};
        turn.endMarks[newStepId].${name} = ${parser.set(def.show)};
        `
            : ""
        }
      }`
      )
      .concat('{ turn.links[newStepId].endturn = "start"+otherplayer; }')
      .join(" else ");
  } else {
    throw "Unknown link: " + name;
  }
}
