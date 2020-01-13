import { TransetMeta } from "./_types";

const transetMeta: TransetMeta = {
  code: "z",
  id: "transet",
  name: "Transet",
  source: "http://sagme.blogspot.se/2013/05/transet.html",
  links: ["http://sagme.blogspot.se/2013/05/transet.html"],
  tags: ["infiltration", "differentunits"],
  tagline:
    "Catch your opponent off guard through swapping your units as you seek access to her base",
  rules: {
    flow: [
      "line",
      "Players take turn to",
      "move",
      "or",
      "swap",
      "a single unit",
    ],
    actions: {
      move: {
        who: [1, 2],
        rule: [
          "line",
          "move",
          "a unit to a vacant space, or to an enemy unit which is returned to its home",
          "base",
        ],
      },
      swap: {
        who: [1, 2],
        rule: [
          "line",
          "Step the current unit 1 step in any orthogonal direction if you can step another friendly unit in the opposite direction. Both target squares must be empty.",
        ],
      },
    },
    tiles: {
      base: {
        who: [1, 2],
        rule: ["line", "move", "a unit here to win via", "infiltration"],
      },
    },
    goals: {
      infiltration: {
        who: [1, 2],
        rule: ["line", "move", "a", "unit", "to the enemy", ["tile", "base"]],
      },
    },
    units: {
      pawn: {
        who: [1, 2],
        rule: [
          "line",
          "Can",
          "move",
          "1 step orthogonally towards the enemy",
          "base",
        ],
      },
      bishop: {
        who: [1, 2],
        rule: [
          "line",
          "Can",
          "move",
          "1 step diagonally towards the enemy base",
        ],
      },
      king: {
        who: [1, 2],
        rule: [
          "line",
          "Can",
          "move",
          "1 step straight or diagonally towards the enemy base",
        ],
      },
    },
  },
};

export default transetMeta;
