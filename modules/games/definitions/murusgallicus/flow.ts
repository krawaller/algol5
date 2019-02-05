import { MurusgallicusFlow } from "./_types";

const murusgallicusFlow: MurusgallicusFlow = {
  startTurn: {
    link: "selecttower"
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
      runGenerators: ["findmoveresults"],
      link: "move"
    },
    selectkill: {
      from: "killtargets",
      link: "kill"
    }
  },
  commands: {
    move: {
      applyEffects: [
        { killat: "selecttower" },
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
        { killat: "selectkill" }
      ],
      link: "endturn"
    }
  }
};

export default murusgallicusFlow;
