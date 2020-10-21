import { RazzledazzleDefinition } from "./_types";

const razzledazzleFlow: RazzledazzleDefinition["flow"] = {
  startTurn: {
    links: ["selectmover", "selectpasser"],
  },
  commands: {
    move: {
      applyEffects: [
        {
          if: [
            { anyat: ["resters", "selectmover"] },
            { morphat: ["selectmover", "receivers"] },
          ],
        },
        { moveat: ["selectmover", "selectmovetarget"] },
        {
          setbattlepos: [
            { playercase: ["plr1lastmove", "plr2lastmove"] },
            "selectmovetarget",
          ],
        },
      ],
      link: "endTurn",
    },
    pass: {
      purge: ["passtargets"],
      applyEffects: [
        {
          setbattlepos: [
            { playercase: ["plr1lastmove", "plr2lastmove"] },
            ["emptypos"],
          ],
        },
        {
          morphin: ["mycarriers", "resters"],
        },
        {
          morphat: ["selectpasstarget", "carriers"],
        },
      ],
      runGenerator: "findpasstargets",
      links: ["endTurn", "selectpasstarget"],
    },
  },
  marks: {
    selectmover: {
      from: { subtract: ["myunits", "mycarriers"] },
      runGenerator: "findmovetargets",
      link: "selectmovetarget",
    },
    selectpasser: {
      from: "mycarriers",
      runGenerator: "findpasstargets",
      link: "selectpasstarget",
    },
    selectpasstarget: {
      from: "passtargets",
      link: "pass",
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move",
    },
  },
};

export default razzledazzleFlow;
