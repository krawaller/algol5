import { UisgeDefinition } from "./_types";

const uisgeFlow: UisgeDefinition["flow"] = {
  endGame: {
    domination: {
      condition: { same: [{ sizeof: "mykings" }, 6] },
      show: "mykings",
    },
  },
  startTurn: {
    link: "selectunit",
  },
  commands: {
    jump: {
      applyEffects: [
        {
          morphat: [
            "selectunit",
            {
              ifelse: [{ anyat: ["kings", "selectunit"] }, "soldiers", "kings"],
            },
          ],
        },
        { moveat: ["selectunit", "selectjumptarget"] },
      ],
      runGenerator: "findgroup",
      link: { if: [{ same: [{ sizeof: "group" }, 11] }, "endTurn"] },
    },
    step: {
      applyEffect: { moveat: ["selectunit", "selectsteptarget"] },
      runGenerator: "findgroup",
      link: { if: [{ same: [{ sizeof: "group" }, 11] }, "endTurn"] },
    },
  },
  marks: {
    selectunit: {
      from: "units",
      runGenerators: [
        "findmjumptargets",
        { if: [{ anyat: ["kings", "selectunit"] }, "findsteptargets"] },
      ],
      links: [
        "selectjumptarget",
        { if: [{ anyat: ["kings", "selectunit"] }, "selectsteptarget"] },
      ],
    },
    selectjumptarget: {
      from: "jumptargets",
      link: "jump",
    },
    selectsteptarget: {
      from: "steptargets",
      link: "step",
    },
  },
};

export default uisgeFlow;
