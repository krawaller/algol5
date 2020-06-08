import { ConnectfourDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const connectfourBoardBook: ConnectfourDefinition["boards"] = {
  basic: {
    height: 6,
    width: 7,
    terrain: {
      edge: [{ rect: ["a6", "g6"] }],
    },
  },
};

export default connectfourBoardBook;
