import { OrthokonFlow } from './_types';

const orthokonFlow: OrthokonFlow = {
  startTurn: {
    link: "selectunit"
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget"
    },
    selectmovetarget: {
      from: "movetargets",
      runGenerator: "findvictims",
      link: "move"
    }
  },
  commands: {
    move: {
      applyEffects: [
        ["moveat", "selectunit", "selectmovetarget"],
        ["setin", "victims", "owner", ["currentplayer"]]
      ],
      link: "endturn"
    }
  }
};

export default orthokonFlow;
