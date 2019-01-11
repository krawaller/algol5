import { JostleInstructions } from './_types';

const jostleInstructions: JostleInstructions = {
  startTurn: "Select which unit to jostle!",
  selectunit: ["line", "This unit neighbours", ["pluralise", ["sizeof", "initialfriend"], "friend", "friends"], "and", ["pluralise", ["sizeof", "initialenemy"], "enemy", "enemies"], "making the square worth", ["minus", ["sizeof", "initialfriend"],
    ["sizeof", "initialenemy"]
  ], ". Select a higher value square to jostle to"],
  selectmovetarget: ["line", "From", "selectmovetarget", "you would neighbour", ["pluralise", ["minus", ["sizeof", "newfriend"], 1], "friend", "friends"], "and", ["pluralise", ["sizeof", "newenemy"], "enemy", "enemies"], ", making it worth", ["minus", ["minus", ["sizeof", "newfriend"], 1],
    ["sizeof", "newenemy"]
  ], ". Press", "jostle", "to move from", "selectunit", "to", "selectmovetarget"]
};

export default jostleInstructions;
