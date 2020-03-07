import { ShoveoffDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const shoveoffBoardBook: ShoveoffDefinition["boards"] = {
  basic: {
    height: 4,
    width: 4,
    terrain: {
      southedge: [{ rect: ["a1", "d1"] }],
      northedge: [{ rect: ["a4", "d4"] }],
      westedge: [{ rect: ["a1", "a4"] }],
      eastedge: [{ rect: ["d1", "d4"] }],
      edge: [{ holerect: ["a1", "d4", "b2", "b3", "c2", "c3"] }]
    }
  }
};

export default shoveoffBoardBook;
