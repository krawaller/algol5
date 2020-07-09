import { DesdemonaDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const desdemonaBoardBook: DesdemonaDefinition["boards"] = {
  basic: {
    height: 7,
    width: 7,
    terrain: {},
  },
};

export default desdemonaBoardBook;
