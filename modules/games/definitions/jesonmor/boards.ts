import { JesonmorDefinition } from "./_types";

// This is the source of truth for what terrain layers are available.
// Whenever you update this definition you should also regenerate
// the graphics from the graphics module.

const jesonmorBoardBook: JesonmorDefinition["boards"] = {
  basic: {
    height: 9,
    width: 9,
    terrain: {
      center: {
        0: ["e5"],
      },
    },
    offset: "knight"
  }
};

export default jesonmorBoardBook;
