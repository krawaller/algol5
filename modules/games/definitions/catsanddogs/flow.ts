import { CatsanddogsDefinition } from "./_types";

const catsanddogsFlow: CatsanddogsDefinition["flow"] = {
  startTurn: { links: ["selectdeploytarget"]},
  commands: {
    deploy: {
      applyEffect: { spawnat: ["selectdeploytarget", "animals", ['player']] },
      link: "endTurn"
    },
  },
  marks: {
    selectdeploytarget: {
      runGenerator: 'findforbidden',
      from: { subtract: ["board", "units" ] },
      link: {if: [{noneat: ['forbidden', "selectdeploytarget"]}, 'deploy']}
    },
  },
};

export default catsanddogsFlow;
