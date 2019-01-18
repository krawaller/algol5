import { CoffeeGenerators } from "./_types";

const coffeeGenerators: CoffeeGenerators = {
  findgeneratees: {
    type: "walker",
    dirs: ["rose"],
    start: "selectdrop",
    draw: {
      steps: {
        unlessover: "units",
        tolayer: {
          indexlist: [
            ["dir"],
            "FOOBAR",
            "vertical",
            "uphill",
            "horisontal",
            "downhill",
            "vertical",
            "uphill",
            "horisontal",
            "downhill"
          ]
        }
      }
    }
  },
  findwinlines: {
    type: "walker",
    dirs: ["rose"],
    starts: "myunits",
    steps: "myunits",
    startasstep: true,
    draw: {
      steps: {
        condition: { same: [4, ["walklength"]] },
        tolayer: "winline"
      }
    }
  }
};

export default coffeeGenerators;
