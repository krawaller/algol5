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
      link: {
        playercase: [
          { ifelse: [["isFirstTurn"], "endTurn", "selectfiretarget"] },
          "selectfiretarget",
        ],
      },
    },
    fire: {
      applyEffects: [
        { spawnat: ["selectfiretarget", "stones"] },
        { adoptin: ["victims"] },
      ],
      runGenerator: "findmovers",
      link: {
        ifelse: [
          { and: [{ notempty: "mymovers" }, { isempty: "oppmovers" }] },
          "selectunit",
          "endTurn",
        ],
      },
    },
  },
  marks: {
    selectunit: {
      from: { ifelse: [{ notempty: "mymovers" }, "mymovers", "myamazons"] },
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
