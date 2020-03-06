import { DaggersDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const daggersBoardBook: DaggersDefinition["boards"] = {
  basic: {
    height: 8,
    width: 8,
    terrain: {
      base: { "1": [{ rect: ["a8", "h8"] }], "2": [{ rect: ["a1", "h1"] }] }
    }
  }
};

export default daggersBoardBook;
