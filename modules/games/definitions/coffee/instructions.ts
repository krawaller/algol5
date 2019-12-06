import { CoffeeInstructions } from './_types';

const coffeeInstructions: CoffeeInstructions = {
  startTurn: {
    ifelse: [
      { isempty: "neutralunits" },
      {
        line: [
          "Select",
          "any square to place the first",
          "soldiers",
          "of the game",
        ],
      },
      {
        line: [
          "Select",
          { unittype: ["soldiers", 0] },
          "to turn into",
          "soldiers",
        ],
      },
    ],
  },
  selectdrop: {
    line: [
      "Press",
      {
        orlist: [
          { if: [{ notempty: "uphill" }, "uphill"] },
          { if: [{ notempty: "downhill" }, "downhill"] },
          { if: [{ notempty: "vertical" }, "vertical"] },
          { if: [{ notempty: "horisontal" }, "horisontal"] },
        ],
      },
      "to give",
      ["otherplayer"],
      "placing options in that direction",
    ],
  },
};

export default coffeeInstructions;
