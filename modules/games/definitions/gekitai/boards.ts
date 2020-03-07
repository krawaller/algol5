import { GekitaiDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const gekitaiBoardBook: GekitaiDefinition["boards"] = {
  basic: { height: 6, width: 6, terrain: {} }
};

export default gekitaiBoardBook;
