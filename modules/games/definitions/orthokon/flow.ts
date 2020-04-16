import { OrthokonDefinition } from "./_types";

const orthokonFlow: OrthokonDefinition["flow"] = {
  startTurn: { link: "selectunit" },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findslidetargets",
      link: "selectslidetarget",
    },
    selectslidetarget: {
      from: "slidetargets",
      runGenerator: "findvictims",
      link: "slide",
    },
  },
  commands: {
    slide: {
      applyEffects: [
        { moveat: ["selectunit", "selectslidetarget"] },
        { adoptin: ["victims", ["player"]] },
      ],
      link: "endTurn",
    },
  },
};

export default orthokonFlow;
