import {Instructions} from '../../../types';
import { SemaphorPhase } from './_types';

const semaphorInstructions: Instructions<SemaphorPhase> = {
  startTurn: ["line", "Select", ["orlist", [
      ["different", ["sizeof", "units"], 12], "an empty square to deploy to"
    ],
    [
      ["notempty", ["union", "bishops", "pawns"]],
      ["line", "a", ["orlist", [
          ["notempty", "pawns"], "pawn"
        ],
        [
          ["notempty", "bishops"], "bishop"
        ]
      ], "to promote"]
    ]
  ]],
  selectdeploytarget: ["line", "Press", "deploy", "to place a pawn at", "selectdeploytarget"],
  selectunit: ["line", "Press", "promote", "to turn the", ["ifelse", ["anyat", "pawns", "selectunit"], "pawn into a bishop", "bishop into a king"]]
};

export default semaphorInstructions;
