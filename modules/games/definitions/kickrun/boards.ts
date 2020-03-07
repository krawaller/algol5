import { KickrunDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const kickrunBoardBook: KickrunDefinition["boards"] = {
  basic: {
    height: 5,
    width: 5,
    terrain: { corners: { "1": ["a1"], "2": ["e5"] } }
  }
};

export default kickrunBoardBook;
