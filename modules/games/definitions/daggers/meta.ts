import {Meta} from '../../../types';

const daggersMeta: Meta = {
  id: "daggers",
  name: "Daggers",
  about: {
    tags: ["differentunits", "asymmetric", "multiplegoals", "infiltrate", "killking", "capture"],
    tagline: "Will the superior position at the top of the hill beat overwhelming numbers?",
    links: {
      "World of Abstract Games": "http://www.di.fc.ul.pt/~jpn/gv/daggers.htm",
      "Board game geek": "https://boardgamegeek.com/boardgame/186029/daggers"
    }
  },
  rules: {
    flow: ["line", "Players take turn to", "move", "a single unit"],
    concepts: {
      uphill: ["line", "A", "move", "northwest, north or northeast", "is uphill, so", ["unitname", "bishops"], "move slower in this direction"],
      downhill: ["line", "A", "move", "southwest, south or southeast", "is downhill, so", ["unitname", "bishops"], "move faster in this direction"]
    },
    actions: {
      move: {
        who: [1, 2],
        rule: ["line", "Move a unit to a vacant space, or to an enemy unit which is captured (except ", ["unitname", "bishops"], "can't capture each other vertically)"]
      }
    },
    tiles: {
      base: {
        who: [1, 2],
        rule: ["line", "move", "a", "king", "here to win via", "infiltration"]
      }
    },
    goals: {
      regicide: {
        who: [1, 2],
        rule: ["line", "Kill an enemy", "king"]
      },
      infiltration: {
        who: [1, 2],
        rule: ["line", "move", "a", "king", "to the enemy", ["tile", "base"]]
      }
    },
    units: {
      bishop: {
        who: [1, 2],
        rule: ["line", "Can", "move", "vertically or diagonally, 1 step ", "uphill", "or any number of steps", "downhill", ". Captures", ["unitname", "kings"], "vertically, or any piece diagonally."]
      },
      king: {
        who: [1, 2],
        rule: ["line", "Can", "move", "1 step in any direction, capturing any enemy."]
      }
    }
  }
};

export default daggersMeta;
