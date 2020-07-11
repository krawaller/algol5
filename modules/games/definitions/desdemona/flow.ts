import { DesdemonaDefinition } from "./_types";

const desdemonaFlow: DesdemonaDefinition["flow"] = {
  endGame: {
    dominance: {
      who: {
        ifelse: [
          { morethan: [{ sizeof: "mystones" }, { sizeof: "oppstones" }] },
          ["player"],
          {
            ifelse: [
              { morethan: [{ sizeof: "oppstones" }, { sizeof: "mystones" }] },
              ["otherplayer"],
              0,
            ],
          },
        ],
      },
      show: {
        ifelse: [
          { morethan: [{ sizeof: "mystones" }, { sizeof: "oppstones" }] },
          "mystones",
          {
            ifelse: [
              { morethan: [{ sizeof: "oppstones" }, { sizeof: "mystones" }] },
              "oppstones",
              ["empty"],
            ],
          },
        ],
      },
      whenStarvation: true,
      condition: ["true"],
    },
  },
  startTurn: {
    link: "selectunit",
  },
  commands: {
    move: {
      applyEffects: [
        { setturnpos: ["movedto", "selectmovetarget"] },
        { moveat: ["selectunit", "selectmovetarget"] },
      ],
      runGenerators: ["findspawntargets", "findcapturetargets"],
      link: "selectfiretarget",
    },
    fire: {
      applyEffects: [
        { spawnat: ["selectfiretarget", "stones"] },
        { adoptin: ["victims"] },
      ],
      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: "myamazons",
      runGenerator: "findmovetargets",
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move",
    },
    selectfiretarget: {
      from: "firetargets",
      runGenerator: {
        if: [{ anyat: ["capturespot", "selectfiretarget"] }, "findvictims"],
      },
      link: "fire",
    },
  },
};

export default desdemonaFlow;
