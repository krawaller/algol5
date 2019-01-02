import {Definition} from '../../types';

const semaphorRules: Definition = {
  startTurn: {
    links: ["selectdeploytarget", "selectunit"]
  },
  endGame: {
    madeline: {
      condition: ["notempty", "line"],
      show: "line"
    }
  },
  marks: {
    selectdeploytarget: {
      from: ["subtract", "board", "units"],
      link: "deploy"
    },
    selectunit: {
      from: ["union", "pawns", "bishops"],
      link: "promote"
    }
  },
  commands: {
    deploy: {
      applyEffect: ["spawn", "selectdeploytarget", "pawns", 0],
      runGenerator: "findlines",
      link: "endturn"
    },
    promote: {
      applyEffect: ["setat", "selectunit", "group", ["ifelse", ["anyat", "pawns", "selectunit"], "bishops", "kings"]],
      runGenerator: "findlines",
      link: "endturn"
    }
  },
  generators: {
    findlines: {
      type: "walker",
      dirs: [1, 2, 3, 4],
      starts: "units",
      steps: ["unitlayer", ["read", "units", ["start"], "group"]],
      startasstep: true,
      draw: {
        steps: {
          condition: ["morethan", ["walklength"], 2],
          tolayer: "line"
        }
      }
    }
  }
};

export default semaphorRules;
