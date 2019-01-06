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
    game.start${player} = function(turn,step){
      var turn = {
        steps: {},
        player: player,
        turn: turn.turn+1,
        links: {root:{}},
        endMarks: {}
      };

      var MARKS = {}; 
      var ARTIFACTS = ${JSON.stringify(blankArtifactLayers(def))};
      var UNITDATA = step.UNITDATA;
      ${usesTurnVars(def) ? "var TURNVARS = {}; " : ""}
      ${usesBattleVars(def) ? "var BATTLEVARS = step.BATTLEVARS; " : ""}
      ${calculateUnitLayers(def, player, true)}
      ${applyGenerators(def, player, "startturn", startDef)}
      var newstep = turn.steps.root = {
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
        MARKS: "var MARKS = step.MARKS; ",
        ARTIFACTS: "var ARTIFACTS = step.ARTIFACTS; ",
        UNITLAYERS: "var UNITLAYERS = step.UNITLAYERS; ",
        UNITDATA: "var UNITDATA = step.UNITDATA; "
      })}
      return ${instruction};
    };
  `;
}
