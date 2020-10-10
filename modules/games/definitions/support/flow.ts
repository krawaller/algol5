import { SupportDefinition } from "./_types";

const supportFlow: SupportDefinition["flow"] = {
  startTurn: {
    link: "selectedge",
  },
  commands: {
    insert: {
      applyEffects: [
        {
          killat: "selectpushtarget",
        },
        {
          pushin: [
            "pushees",
            { read: ["pushtargets", "selectpushtarget", "dir"] },
          ],
        },
        {
          spawnat: ["selectedge", "soldiers"],
        },
      ],
      link: "endTurn",
    },
  },
  marks: {
    selectedge: {
      from: { subtract: ["edge", "oppunits"] },
      runGenerator: {
        if: [{ anyat: ["mysoldiers", "selectedge"] }, "findpushtargets"],
      },
      link: {
        ifelse: [
          { anyat: ["mysoldiers", "selectedge"] },
          "selectpushtarget",
          "insert",
        ],
      },
    },
    selectpushtarget: {
      from: "pushtargets",
      runGenerator: "findpushees",
      link: "insert",
    },
  },
};

export default supportFlow;
