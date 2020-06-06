import { AtriumDefinition } from "./_types";

const atriumFlow: AtriumDefinition["flow"] = {
  endGame: {
    madewinline: { condition: { notempty: "winline" }, show: "winline" },
  },
  startTurn: { link: "selectunit" },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      runGenerator: {
        if: [{ anyat: ["units", "selectmovetarget"] }, "findpushees"],
      },
      link: {
        if: [
          {
            or: [
              { noneat: ["units", "selectmovetarget"] },
              { notempty: "pushees" },
            ],
          },
          "move",
        ],
      },
    },
  },
  commands: {
    move: {
      applyEffects: [
        {
          pushin: [
            "pushees",
            { read: ["movetargets", "selectmovetarget", "dir"] },
          ],
        },
        { moveat: ["selectunit", "selectmovetarget"] },
      ],
      runGenerator: "findwinlines",
      link: "endTurn",
    },
  },
};

export default atriumFlow;
