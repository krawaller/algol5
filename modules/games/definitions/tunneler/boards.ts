import { TunnelerDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const tunnelerBoardBook: TunnelerDefinition["boards"] = {
  basic: {
    height: 11,
    width: 11,
    terrain: {},
  },
};

export default tunnelerBoardBook;
