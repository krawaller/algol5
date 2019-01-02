import {Instructions} from '../../types';
import { GogolPhase } from './_types';

const gogolInstructions: Instructions<GogolPhase> = {
  startTurn: ["ifelse", ["morethan", ["turn"], 2], "Select a unit to move", "Select where to deploy your king"],
  selectkingdeploy: ["line", "Press", "deploy", "to place your king here"],
  selectunit: ["ifelse", ["anyat", "kings", "selectunit"],
    ["line", "Select where to", ["orlist", [
        ["notempty", "kingwalk"],
        ["text", "move"]
      ],
      [
        ["notempty", "jumptargets"],
        ["text", "jump"]
      ]
    ], "your", "king", ["if", ["overlaps", "nokings", ["union", "kingwalk", "jumptargets"]], "without making a forbidden configuration"]],
    ["line", "Select where to move", ["if", ["notempty", "jumptargets"], "or jump"], "your", "pawn", ["if", ["notempty", "nosoldiers"], "without making a forbidden configuration"]]
  ],
  selectjumptarget: ["line", "Press", "jump", "to jump from", "selectunit", "to", "selectjumptarget", " and kill the", ["unitnameat", ["onlyin", "splashed"]], "at", ["onlyin", "splashed"]],
  selectmovetarget: ["line", "Press", "move", "to go from", "selectunit", "to", "selectmovetarget"]
};

export default gogolInstructions;
