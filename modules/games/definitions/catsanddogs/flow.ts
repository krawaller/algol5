import { CatsanddogsDefinition } from "./_types";

const catsanddogsFlow: CatsanddogsDefinition["flow"] = {
  startTurn: { links: ["selectdeploytarget"]},
  commands: {
    deploy: {
      applyEffect: { spawnat: ["selectdeploytarget", "unit", 0] },
      runGenerator: "findlines",
      link: "endTurn"
    },
  },
  marks: {
    selectdeploytarget: {
      from: { subtract: ["board", "units"] },
      link: "deploy"
    },
  }
};

export default catsanddogsFlow;
