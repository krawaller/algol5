import {Instructions} from '../../types';
import { SerauqsPhase } from './_types';

const serauqsInstructions: Instructions<SerauqsPhase> = {
  startTurn: ["ifelse", ["morethan", ["turn"], 2],
    ["line", "Select which", "pawn", "or", "king", "to", "move"],
    ["line", "Select which", "pawn", "to", "promote"]
  ],
  selectunit: ["ifelse", ["morethan", ["turn"], 2],
    ["line", "Select where to", "move", "the", ["unitnameat", "selectunit"],
      ["if", ["anyat", "wild", "selectunit"], "(remeber that it matches for your opponent too!)"]
    ],
    ["line", "Press", "promote", "to turn this", "pawn", "to a", "king", ", making it match for your opponent too"]
  ],
  selectmovetarget: ["line", "Press", "move", "to go from", "selectunit", "to", "selectmovetarget"]
};

export default serauqsInstructions;
