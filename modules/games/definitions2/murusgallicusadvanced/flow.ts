import { MurusgallicusadvancedFlow } from "./_types";

const murusgallicusadvancedFlow: MurusgallicusadvancedFlow = {
  startTurn: {
    links: ["selecttower", "selectcatapult"]
  },
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
        ["if", ["anyat", "oppcatapults", "selectkill"], "sacrifice"]
      ]
    },
    selectcatapult: {
      from: "mycatapults",
      runGenerator: "findfiretargets",
      link: "selectfire"
    },
    selectfire: {
      from: "firetargets",
      link: "fire"
    }
  },
  commands: {
    move: {
      applyEffects: [
        ["killat", "selecttower"],
        [
          "forposin",
          "madecatapults",
          ["setat", ["target"], "group", "catapults"]
        ],
        ["forposin", "madetowers", ["setat", ["target"], "group", "towers"]],
        [
          "forposin",
          "madewalls",
          [
            "spawn",
            ["target"],
            "walls",
            ["player"],
            {
              from: ["pos", "selecttower"]
            }
          ]
        ]
      ],
      link: "endturn"
    },
    kill: {
      applyEffects: [
        ["setat", "selecttower", "group", "walls"],
        [
          "ifelse",
          ["anyat", "oppcatapults", "selectkill"],
          ["setat", "selectkill", "group", "towers"],
          ["killat", "selectkill"]
        ]
      ],
      link: "endturn"
    },
    sacrifice: {
      applyEffects: [
        ["setat", "selectkill", "group", "walls"],
        ["killat", "selecttower"]
      ],
      link: "endturn"
    },
    fire: {
      applyEffects: [
        [
          "ifelse",
          ["anyat", "oppwalls", "selectfire"],
          ["killat", "selectfire"],
          [
            "ifelse",
            ["anyat", "oppunits", "selectfire"],
            [
              "setat",
              "selectfire",
              "group",
              [
                "ifelse",
                ["anyat", "oppcatapults", "selectfire"],
                "towers",
                "walls"
              ]
            ],
            [
              "spawn",
              "selectfire",
              "walls",
              ["player"],
              {
                from: ["pos", "selectcatapult"]
              }
            ]
          ]
        ],
        ["setat", "selectcatapult", "group", "towers"]
      ],
      link: "endturn"
    }
  }
};

export default murusgallicusadvancedFlow;
