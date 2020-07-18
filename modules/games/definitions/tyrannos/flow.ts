import { TyrannosDefinition } from "./_types";

const tyrannosFlow: TyrannosDefinition["flow"] = {
  endGame: {
    regicide: {
      condition: { isempty: "opptyrannos" },
      show: { single: "selectunit" },
    },
  },
  startTurn: {
    link: "selectunit",
  },
  commands: {
    move: {
      applyEffects: [
        {
          if: [
            {
              and: [
                { anyat: ["warriors", "selectunit"] },
                { anyat: ["oppbase", "selectmovetarget"] },
              ],
            },
            {
              morphat: ["selectunit", "heroes"],
            },
          ],
        },
        { moveat: ["selectunit", "selectmovetarget"] },
      ],
      link: "endTurn",
    },
    attack: {
      applyEffect: { killat: "selectattacktarget" },
      link: "endTurn",
    },
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findtargets",
      links: [
        {
          if: [{ noneat: ["barricades", "selectunit"] }, "selectattacktarget"],
        },
        "selectmovetarget",
      ],
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move",
    },
    selectattacktarget: {
      from: "attacktargets",
      link: "attack",
    },
  },
};

export default tyrannosFlow;
