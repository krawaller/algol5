import { MadbishopsDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const madbishopsBoardBook: MadbishopsDefinition["boards"] = {
  basic: {
    height: 10,
    width: 10,
    terrain: {},
  },
};

export default madbishopsBoardBook;
