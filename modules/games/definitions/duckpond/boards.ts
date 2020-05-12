import { DuckpondDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const duckpondBoardBook: DuckpondDefinition["boards"] = {
  basic: {
    height: 5,
    width: 5,
    terrain: {}
  }
};

export default duckpondBoardBook;
