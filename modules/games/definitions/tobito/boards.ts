import { TobitoDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const tobitoBoardBook: TobitoDefinition["boards"] = {
  basic: {
    height: 3,
    width: 5,
    terrain: {
      base: {
        1: ['a1','a2','a3'],
        2: ['e1','e2','e3']
      }
    }
  }
};

export default tobitoBoardBook;
