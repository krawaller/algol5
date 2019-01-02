import {Instructions} from '../../types';
import { ThreemusketeersPhase } from './_types';

const threemusketeersInstructions: Instructions<ThreemusketeersPhase> = {
  startTurn: ["playercase", ["line", "Select which", "king", "to move"],
    ["line", "Select which", "pawn", "to move"]
  ],
  selectunit: ["playercase", ["line", "Select a", "pawn", "adjacent to the", "selectunit", "king", "to attack"],
    ["line", "Select an empty space adjacent to the", "selectunit", "pawn", "to move to"]
  ],
  selectmovetarget: ["playercase", ["line", "Press", "move", "to make your", "selectunit", "king", "attack the", "selectmovetarget", "pawn"],
    ["line", "Press", "move", "to go from", "selectunit", "to", "selectmovetarget"]
  ]
};

export default threemusketeersInstructions;
