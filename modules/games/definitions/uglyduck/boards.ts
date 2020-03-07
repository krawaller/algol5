import { UglyduckDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const uglyduckBoardBook: UglyduckDefinition["boards"] = {
  basic: {
    height: 5,
    width: 5,
    terrain: {
      homerow: { "1": [{ rect: ["a1", "e1"] }], "2": [{ rect: ["a5", "e5"] }] }
    }
  }
};

export default uglyduckBoardBook;
