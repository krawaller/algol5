import { DesdemonaDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const desdemonaBoardBook: DesdemonaDefinition["boards"] = {
  basic: {
    height: 10,
    width: 10,
  },
  border: {
    height: 10,
    width: 10,
    terrain: {
      border: [
        { rect: ["a1", "a10"] },
        { rect: ["b10", "i10"] },
        { rect: ["b1", "i1"] },
        { rect: ["j1", "j10"] },
      ],
    },
  },
};

export default desdemonaBoardBook;
