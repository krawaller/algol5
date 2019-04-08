import * as map from "lodash/map";

import makeExpr from "../expressions";
import { FullDefAnon } from "../types";
import obey from "../obey";
import applyGenerators from "../artifacts/generate";

function addLink(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  name: string,
  root: boolean
) {
  const expr = makeExpr(gameDef, player, action);
  if (gameDef && gameDef.flow.commands && gameDef.flow.commands[name]) {
    return `
      turn.links${root ? ".root" : "[newstepid]"}.${name} = '${name + player}';
    `;
  } else if (gameDef && gameDef.flow.marks && gameDef.flow.marks[name]) {
    const markDef = gameDef.flow.marks[name];
    return `
      let newlinks = turn.links${root ? ".root" : "[newstepid]"};
      for(let linkpos in ${expr.set(markDef.from)}){
          newlinks[linkpos] = '${name + player}';
      }
    `;
  } else if (name === "endturn") {
    const endTurnDef = gameDef.flow.endTurn || { unless: null };
    let ret = applyGenerators(gameDef, player, "endturn", endTurnDef);
    //let ret = lib.applyGeneratorInstructions({...(O || {}), generating:true},endTurnDef || {})
    return (
      ret +
      map(endTurnDef.unless, (cond, name) => {
        return (
          "if (" + expr.bool(cond) + '){ turn.blockedby = "' + name + '"; } '
        );
      })
        .concat(
          map(
            gameDef.flow.endGame,
            (def, name) => `
      if (${expr.bool(def.condition)}) { 
        let winner = ${expr.value(def.who || player)};
        let result = winner === ${player} ? 'win' : winner ? 'lose' : 'draw';
        turn.links[newstepid][result] = '${name}';
        ${
          def.show
            ? `
        turn.endMarks[newstepid] = turn.endMarks[newstepid] || {};
        turn.endMarks[newstepid].${name} = ${expr.set(def.show)};
        `
            : ""
        }
      }`
          )
        )
        .concat('turn.links[newstepid].endturn = "start"+otherplayer; ')
        .join(" else ")
    );
  } else {
    throw "Unknown link: " + name;
  }
}

export default function applyLinkInstructions(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  actionDef: any,
  root: boolean
) {
  if (actionDef.links) {
    return obey(
      gameDef,
      player,
      action,
      ["all"].concat(actionDef.links),
      link => ` { ${addLink(gameDef, player, action, link, root)} } `
    );
  } else {
    return obey(gameDef, player, action, actionDef.link, link =>
      addLink(gameDef, player, action, link, root)
    );
  }
}
