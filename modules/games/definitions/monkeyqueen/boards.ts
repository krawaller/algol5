import { MonkeyqueenDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const monkeyqueenBoardBook: MonkeyqueenDefinition["boards"] = {
  basic: {
    height: 12,
    width: 12,
    terrain: {},
  },
};

export default monkeyqueenBoardBook;
