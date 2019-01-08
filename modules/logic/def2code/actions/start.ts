import makeExpr from "../expressions";
import { FullDef } from "../types";
import {
  ifCodeContains,
  usesTurnVars,
  usesBattleVars,
  contains,
  blankArtifactLayers
} from "../utils";
import { calculateUnitLayers } from "../common";
import applyLinkInstructions from "./link";
import applyGenerators from "../artifacts/generate";

export default function addStartFunction(def: FullDef, player: 1 | 2) {
  const expr = makeExpr(def, player, "start");
  const startDef = def.flow.startTurn || {};
  const instruction = expr.content(def.instructions.startTurn || "");
  return `
    game.start${player} = function(lastTurn,step){
      let turn: { [f:string]: any } = {
        steps: {},
        player: player,
        turn: lastTurn.turn+1,
        links: {root:{}},
        endMarks: {}
      };

      let MARKS = {}; 
      let ARTIFACTS = ${JSON.stringify(blankArtifactLayers(def))};
      let UNITDATA = step.UNITDATA;
      ${usesTurnVars(def) ? "let TURNVARS = {}; " : ""}
      ${usesBattleVars(def) ? "let BATTLEVARS = step.BATTLEVARS; " : ""}
      ${calculateUnitLayers(def, player, true)}
      ${applyGenerators(def, player, "startturn", startDef)}
      let newstep = turn.steps.root = {
        ARTIFACTS: ARTIFACTS,
        UNITDATA: UNITDATA,
        UNITLAYERS: UNITLAYERS,
        MARKS: MARKS,
        stepid: 'root',
        name: 'start',
        ${
          contains(def, "spawn") || contains(def, "spawnin")
            ? "clones: step.clones, "
            : ""
        }
        path: []
        ${usesTurnVars(def) ? ",TURNVARS: TURNVARS " : ""}
        ${usesBattleVars(def) ? ",BATTLEVARS: BATTLEVARS " : ""}
      };

      ${applyLinkInstructions(def, player, "startturn", startDef, true)}

      return turn;
    }
    game.start${player}instruction = function(turn,step){
      ${ifCodeContains(instruction, {
        MARKS: "let MARKS = step.MARKS; ",
        ARTIFACTS: "let ARTIFACTS = step.ARTIFACTS; ",
        UNITLAYERS: "let UNITLAYERS = step.UNITLAYERS; ",
        UNITDATA: "let UNITDATA = step.UNITDATA; "
      })}
      return ${instruction};
    };
  `;
}
