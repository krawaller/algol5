import { DuploFlow } from './_types';

const duploFlow: DuploFlow = {
  canalwaysend: { deploy: true },
  endGame: {
    boardfull: {
      condition: { same: [{ sizeof: "units" }, 64] },
      who: {
        ifelse: [
          { morethan: [{ sizeof: "myunits" }, { sizeof: "oppunits" }] },
          ["player"],
          {
            ifelse: [
              { same: [{ sizeof: "oppunits" }, { sizeof: "myunits" }] },
              ["otherplayer"],
              0
            ]
          }
        ]
      }
    }
  },
  startTurn: {
    link: {
      ifelse: [{ morethan: [["turn"], 2] }, "selectunit", "selectdeploy"]
    }
  },
  marks: {
    selectdeploy: { from: { subtract: ["board", "units"] }, link: "deploy" },
    selectunit: {
      from: "myunits",
      runGenerators: [
        "findspawndirs",
        "findgrowstarts",
        "findexpandpoints",
        "findoppstrengths"
      ],
      link: "selecttarget"
    },
    selecttarget: {
      from: "targets",
      runGenerator: "findspawns",
      link: "expand"
    }
  },
  commands: {
    deploy: {
      applyEffect: { spawnat: ["selectdeploy", "soldiers"] },
      link: {
        ifelse: [
          { morethan: [{ sizeof: "mysoldiers" }, 1] },
          "endTurn",
          "selectdeploy"
        ]
      }
    },
    expand: {
      applyEffects: [
        {
          spawnin: [
            "spawns",
            "soldiers",
            ["player"],
            { from: { pos: "selectunit" } }
          ]
        },
        {
          if: [
            { anyat: ["units", "selecttarget"] },
            {
              multi: [
                { killat: "selecttarget" },
                {
                  spawnat: [
                    "selecttarget",
                    "soldiers",
                    0,
                    { from: { pos: "selectunit" } }
                  ]
                }
              ]
            }
          ]
        }
      ],
      link: "endTurn"
    }
  }
};

export default duploFlow;
