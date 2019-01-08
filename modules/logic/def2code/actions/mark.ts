import { FullDef } from "../types";

import makeExpr from "../expressions";
import { ifCodeContains } from "../utils";
import { copyArtifactsForAction } from "../common";

import applyLinkInstructions from "./link";
import applyGeneratorInstructions from "../artifacts/generate";

export default function addMarkFunction(
  def: FullDef,
  markname: string,
  player: 1 | 2
) {
  const expr = makeExpr(def, player, markname);
  const markDef = def.flow.marks[markname];
  let newMarkObject = `Object.assign({},step.MARKS,{${markname}:markpos})`;
  if (markDef.flow !== "cyclic") {
    let marksToKeep = markDef.flow.reduce((mem, p) => {
      switch (p.type) {
        case "mark":
          return mem.concat(p.name);
        case "command":
          return [];
        default:
          return mem;
      }
    }, []);
    newMarkObject =
      "{" +
      [markname + ": markpos"]
        .concat(marksToKeep.map(mname => mname + ": step.MARKS." + mname))
        .join(",") +
      "}";
  }
  const body = `
    let MARKS = ${newMarkObject}; 
    ${applyGeneratorInstructions(def, player, markname, markDef)}
  `;
  const linking = applyLinkInstructions(def, player, markname, markDef, false);
  const preludium = ifCodeContains(body + linking, {
    TURNVARS: "let TURNVARS = step.TURNVARS; ",
    BATTLEVARS: "let BATTLEVARS = step.BATTLEVARS; ",
    ARTIFACTS: "let ARTIFACTS = step.ARTIFACTS; ",
    UNITLAYERS: "let UNITLAYERS = step.UNITLAYERS; "
  });
  const instruction = expr.content(def.instructions[markname] || "");
  return `
      game.${markname}${player} = function(turn,step,markpos){
        ${preludium}
        ${body}
        let newstepid = step.stepid+'-'+markpos;
        let newstep = turn.steps[newstepid] = Object.assign({},step,{
          ${
            markDef.runGenerator || markDef.runGenerators
              ? "ARTIFACTS: ARTIFACTS,"
              : ""
          }
          MARKS: MARKS,
          stepid: newstepid,
          path: step.path.concat(markpos),
          name: '${markname}'
        });
        turn.links[newstepid] = {};
        ${linking}
        return newstep;
      };
      game.${markname}${player}instruction = function(turn,step){
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
