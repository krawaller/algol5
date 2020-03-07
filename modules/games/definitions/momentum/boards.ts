import { MomentumDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const momentumBoardBook: MomentumDefinition["boards"] = {
  basic: { height: 7, width: 7, terrain: {} }
};

export default momentumBoardBook;
