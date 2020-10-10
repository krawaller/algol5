import { SupportDefinition } from "./_types";

const supportFlow: SupportDefinition["flow"] = {
  startTurn: {
    link: "selectorigin",
  },
  commands: {
    move: {
      applyEffects: [
        {
          stompat: ["selectorigin", "selectdestination"],
        },
      ],
      link: "endTurn",
    },
    insert: {
      applyEffects: [
        {
          killat: "selectdestination",
        },
        {
          pushin: [
            "pushees",
            { read: ["pushtargets", "selectdestination", "dir"] },
          ],
        },
        {
          spawnat: ["selectorigin", "soldiers"],
        },
      ],
      link: "endTurn",
    },
  },
  marks: {
    selectorigin: {
      from: { union: ["mysoldiers", { subtract: ["edge", "oppunits"] }] },
      runGenerators: [
        {
          if: [
            { anyat: ["mysoldiers", "selectorigin"] },
            {
              multi: [
                "findconnected",
                "findmovetargets",
                {
                  if: [{ anyat: ["edge", "selectorigin"] }, "findpushtargets"],
                },
              ],
            },
          ],
        },
      ],
      link: {
        ifelse: [
          { noneat: ["mysoldiers", "selectorigin"] },
          "insert",
          "selectdestination",
        ],
      },
    },
    selectdestination: {
      from: { union: ["movetargets", "pushtargets"] },
      runGenerator: {
        if: [{ anyat: ["pushtargets", "selectdestination"] }, "findpushees"],
      },
      links: [
        { if: [{ anyat: ["movetargets", "selectdestination"] }, "move"] },
        { if: [{ anyat: ["pushtargets", "selectdestination"] }, "insert"] },
      ],
    },
  },
};

export default supportFlow;
