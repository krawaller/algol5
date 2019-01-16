import { CoffeeFlow } from "./_types";

const coffeeFlow: CoffeeFlow = {
  TODO:
    "use different unit type for placeholders? Reference oppnent plr properly",
  endTurn: {
    unless: {
      nolegal: ["isempty", "markers"]
    }
  },
  endGame: {
    madeline: {
      condition: { notempty: "winline" },
      show: "winline"
    }
  },
  startTurn: {
    link: "selectdrop"
  },
  marks: {
    selectdrop: {
      from: ["ifelse", ["isempty", "markers"], "board", "markers"],
      runGenerator: "findgeneratees",
      links: [
        ["if", ["notempty", "uphill"], "uphill"],
        ["if", ["notempty", "downhill"], "downhill"],
        ["if", ["notempty", "vertical"], "vertical"],
        ["if", ["notempty", "horisontal"], "horisontal"]
      ]
    }
  },
  commands: {
    uphill: {
      applyEffects: [
        ["forposin", "markers", ["killat", ["target"]]],
        ["spawn", "selectdrop", "soldiers"],
        ["forposin", "uphill", ["spawn", ["target"], "markers", 0]]
      ],
      runGenerator: "findwinlines",
      link: "endturn"
    },
    downhill: {
      applyEffects: [
        ["forposin", "markers", ["killat", ["target"]]],
        ["spawn", "selectdrop", "soldiers"],
        ["forposin", "downhill", ["spawn", ["target"], "markers", 0]]
      ],
      runGenerator: "findwinlines",
      link: "endturn"
    },
    horisontal: {
      applyEffects: [
        ["forposin", "markers", ["killat", ["target"]]],
        ["spawn", "selectdrop", "soldiers"],
        ["forposin", "horisontal", ["spawn", ["target"], "markers", 0]]
      ],
      runGenerator: "findwinlines",
      link: "endturn"
    },
    vertical: {
      applyEffects: [
        ["forposin", "markers", ["killat", ["target"]]],
        ["spawn", "selectdrop", "soldiers"],
        ["forposin", "vertical", ["spawn", ["target"], "markers", 0]]
      ],
      runGenerator: "findwinlines",
      link: "endturn"
    }
  }
};

export default coffeeFlow;
