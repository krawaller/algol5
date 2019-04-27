import { CoffeeInstructions } from "./_types";

const coffeeInstructions: CoffeeInstructions = {
  startTurn: {
    ifelse: [
      { isempty: "neutralunits" },
      { line: ["Select", "any square to place the first unit of the game"] },
      { line: ["Select", "which neutral unit to take over"] }
    ]
  },
  selectdrop: {
    line: [
      "Press",
      {
        orlist: [
          { if: [{ notempty: "uphill" }, "uphill"] },
          { if: [{ notempty: "downhill" }, "downhill"] },
          { if: [{ notempty: "vertical" }, "vertical"] },
          { if: [{ notempty: "horisontal" }, "horisontal"] }
        ]
      },
      "to give your opponent placing options in that direction"
    ]
  }
};

export default coffeeInstructions;
