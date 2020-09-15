import { HippolytaDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const hippolytaBoardBook: HippolytaDefinition["boards"] = {
  basic: {
    height: 8,
    width: 8,
    terrain: {},
  },
  mini: {
    height: 6,
    width: 6,
    terrain: {},
  },
};

export default hippolytaBoardBook;
