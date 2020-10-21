import { RazzledazzleDefinition } from "./_types";

const razzledazzleFlow: RazzledazzleDefinition["flow"] = {
  endGame: {
    goal: {
      condition: { overlaps: ["mycarriers", "oppbase"] },
      show: "mycarriers",
    },
  },
  startTurn: {
    runGenerators: [
      {
        if: [
          {
            truthypos: {
              battlepos: { playercase: ["plr2lastmove", "plr1lastmove"] },
            },
          },
          "findannoyer",
        ],
      },
      "findpasstargets",
    ],
    links: [
      {
        ifelse: [
          { and: [{ notempty: "annoyer" }, { notempty: "passtargets" }] },
          "selectpasstarget",
          { multi: ["selectmover", "selectpasser"] },
        ],
      },
    ],
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
