import {Definition} from '../../types';
import { CoffeeUnit, CoffeeArtifactLayer, CoffeeLayer, CoffeeGenerator, CoffeeMark, CoffeeCommand } from './_types';

const coffeeRules: Definition<CoffeeUnit, CoffeeArtifactLayer, CoffeeLayer, CoffeeGenerator, CoffeeMark, CoffeeCommand> = {
  TODO: "use different unit type for placeholders? Reference oppnent plr properly",
  endTurn: {
    unless: {
      nolegal: ["isempty", "markers"]
    }
  },
  endGame: {
    madeline: {
      condition: ["notempty", "winline"],
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
  },
  generators: {
    findgeneratees: {
      type: "walker",
      dirs: [1, 2, 3, 4, 5, 6, 7, 8],
      start: "selectdrop",
      draw: {
        steps: {
          unlessover: "units",
          tolayer: ["indexlist", ["dir"],
            ["FOOBAR", "vertical", "uphill", "horisontal", "downhill", "vertical", "uphill", "horisontal", "downhill"]
          ]
        }
      }
    },
    findwinlines: {
      type: "walker",
      starts: "myunits",
      steps: "myunits",
      startasstep: true,
      draw: {
        steps: {
          condition: ["same", 4, ["walklength"]],
          tolayer: "winline"
        }
      }
    }
  }
};

export default coffeeRules;
