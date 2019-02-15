import { MurusgallicusadvancedFlow } from './_types';

const murusgallicusadvancedFlow: MurusgallicusadvancedFlow = {
  startTurn: { links: ["selecttower", "selectcatapult"] },
  endGame: {
    infiltration: {
      condition: { overlaps: ["myunits", "opphomerow"] },
      show: { intersect: ["myunits", "opphomerow"] }
    }
  },
  marks: {
    selecttower: {
      from: "mytowers",
      runGenerators: ["findmovetargets", "findkilltargets"],
      links: ["selectmove", "selectkill"]
    },
    selectmove: {
      from: "movetargets",
      runGenerator: "findmoveresults",
      link: "move"
    },
    selectkill: {
      from: "killtargets",
      links: [
        "kill",
        { if: [{ anyat: ["oppcatapults", "selectkill"] }, "sacrifice"] }
      ]
    },
    selectcatapult: {
      from: "mycatapults",
      runGenerator: "findfiretargets",
      link: "selectfire"
    },
    selectfire: { from: "firetargets", link: "fire" }
  },
  commands: {
    move: {
      applyEffects: [
        { killat: "selecttower" },
        { morphin: ["madecatapults", "catapults"] },
        { morphin: ["madetowers", "towers"] },
        {
          spawnin: [
            "madewalls",
            "walls",
            ["player"],
            { from: { pos: "selecttower" } }
          ]
        }
      ],
      link: "endturn"
    },
    kill: {
      applyEffects: [
        { morphat: ["selecttower", "walls"] },
        {
          ifelse: [
            { anyat: ["oppcatapults", "selectkill"] },
            { morphat: ["selectkill", "towers"] },
            { killat: "selectkill" }
          ]
        }
      ],
      link: "endturn"
    },
    sacrifice: {
      applyEffects: [
        { morphat: ["selectkill", "walls"] },
        { killat: "selecttower" }
      ],
      link: "endturn"
    },
    fire: {
      applyEffects: [
        {
          ifelse: [
            { anyat: ["oppwalls", "selectfire"] },
            { killat: "selectfire" },
            {
              ifelse: [
                { anyat: ["oppunits", "selectfire"] },
                {
                  morphat: [
                    "selectfire",
                    {
                      ifelse: [
                        { anyat: ["oppcatapults", "selectfire"] },
                        "towers",
                        "walls"
                      ]
                    }
                  ]
                },
                {
                  spawnat: [
                    "selectfire",
                    "walls",
                    ["player"],
                    { from: { pos: "selectcatapult" } }
                  ]
                }
              ]
            }
          ]
        },
        { morphat: ["selectcatapult", "towers"] }
      ],
      link: "endturn"
    }
  }
};

export default murusgallicusadvancedFlow;
