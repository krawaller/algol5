import { AtriumFlow } from './_types';

const atriumFlow: AtriumFlow = {
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
    selectmovetarget: { from: "movetargets", link: "move" },
  },
  commands: {
    move: {
      applyEffect: { moveat: ["selectunit", "selectmovetarget"] },
      runGenerator: "findwinlines",
      link: "endTurn",
    },
  },
};

export default atriumFlow;
