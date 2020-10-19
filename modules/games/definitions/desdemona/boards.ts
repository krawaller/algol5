import { DesdemonaDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const desdemonaBoardBook: DesdemonaDefinition["boards"] = {
  basic: {
    height: 8,
    width: 8,
    terrain: {
      edge: [
        { rect: ["a1", "h1"] },
        { rect: ["a8", "h8"] },
        { rect: ["a2", "a7"] },
        { rect: ["h2", "h7"] },
      ],
    },
  },
  small: {
    height: 7,
    width: 7,
    terrain: {
      edge: [
        { rect: ["a1", "g1"] },
        { rect: ["a7", "g7"] },
        { rect: ["a2", "a6"] },
        { rect: ["g2", "g6"] },
      ],
    },
  },
  large: {
    height: 10,
    width: 10,
    terrain: {
      edge: [
        { rect: ["a1", "j1"] },
        { rect: ["a10", "j10"] },
        { rect: ["a2", "a9"] },
        { rect: ["j2", "j9"] },
      ],
    },
  },
};

export default desdemonaBoardBook;
