import { ThreemusketeersFlow } from "./_types";

const threemusketeersFlow: ThreemusketeersFlow = {
  startTurn: { link: "selectunit" },
  endGame: {
    musketeersinline: {
      condition: { notempty: "musketeerline" },
      who: 2,
      show: "kings",
      ifPlayer: 1
    },
    strandedmusketeers: {
      condition: { same: [{ sizeof: "strandedmusketeers" }, 3] },
      who: 1,
      ifPlayer: 2
    }
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: "selectmovetarget"
    },
    selectmovetarget: { from: "movetargets", link: "move" }
  },
  commands: {
    move: {
      applyEffect: { stompat: ["selectunit", "selectmovetarget"] },
      runGenerators: [
        "findmusketeerline",
        { ifplayer: [2, "findstrandedmusketeers"] }
      ],
      link: "endturn"
    }
  }
};

export default threemusketeersFlow;
