import { CatsanddogsDefinition } from "./_types";

const catsanddogsFlow: CatsanddogsDefinition["flow"] = {
  startTurn: { links: ["selectdeploytarget"], runGenerator: 'findforbidden'},
  commands: {
    deploy: {
      applyEffect: { spawnat: ["selectdeploytarget", "animals", ['player']] },
      link: "endTurn"
    },
  },
  marks: {
    selectdeploytarget: {
      from: { subtract: ["board", "units", "forbidden"] },
      link: "deploy"
    },
  },
};

export default catsanddogsFlow;
