import { CatsanddogsDefinition } from "./_types";

const catsanddogsFlow: CatsanddogsDefinition["flow"] = {
  startTurn: { links: ["selectdeploytarget"]},
  marks: {
    selectdeploytarget: {
      from: { subtract: ["board", "units"] },
      link: "deploy"
    },
  },
  commands: {
    deploy: {
      applyEffect: { spawnat: ["selectdeploytarget", "animals", ['player']] },
      link: "endTurn"
    },
  },
};

export default catsanddogsFlow;
