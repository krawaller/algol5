import { OrthokonDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const orthokonBoardBook: OrthokonDefinition["boards"] = {
  basic: { height: 4, width: 4, terrain: {} }
};

export default orthokonBoardBook;
