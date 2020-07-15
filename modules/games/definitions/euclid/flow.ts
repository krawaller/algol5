import { EuclidDefinition } from "./_types";

const euclidFlow: EuclidDefinition["flow"] = {
  endGame: {
    domination: {
      condition: { lessthan: [{ sizeof: "oppunits" }, 3] },
      show: "myunits",
    },
  },
  startTurn: {
    link: "selectunit",
  },
  commands: {
    move: {
      applyEffects: [
        { killin: "intersection" },
        { moveat: ["selectunit", "selectmovetarget"] },
      ],
      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      runGenerator: {
        if: [
          {
            and: [
              { noneat: ["mykings", "selectunit"] },
              {
                different: [
                  { posx: "selectmovetarget" },
                  { posx: { onlyin: "mykings" } },
                ],
              },
              {
                different: [
                  { posy: "selectmovetarget" },
                  { posy: { onlyin: "mykings" } },
                ],
              },
            ],
          },
          "findintersections",
        ],
      },
      link: "move",
    },
  },
};

export default euclidFlow;
