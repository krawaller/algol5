import { MadbishopsDefinition } from "./_types";

const madbishopsFlow: MadbishopsDefinition["flow"] = {
  startTurn: {
    link: "selectunit",
  },
  commands: {
    move: {
      applyEffect: { stompat: ["selectunit", "selectmovetarget"] },
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
      from: {
        ifelse: [{ isempty: "killtargets" }, "movetargets", "killtargets"],
      },
      runGenerator: "findthreats",
      link: {
        if: [
          {
            or: [
              { anyat: ["killtargets", "selectmovetarget"] },
              { notempty: "threatened" },
            ],
          },
          "move",
        ],
      },
    },
  },
};

export default madbishopsFlow;
