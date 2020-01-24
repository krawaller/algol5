import { MurusgallicusFlow } from "./_types";

const murusgallicusFlow: MurusgallicusFlow = {
  startTurn: { link: "selecttower" },
  endGame: {
    infiltration: {
      condition: { overlaps: ["myunits", "opphomerow"] },
      show: { intersect: ["myunits", "opphomerow"] }
    }
  },
  marks: {
    selecttower: {
      from: "mytowers",
      runGenerators: ["findmovetargets", "findcrushtargets"],
      links: ["selectmove", "selectcrush"]
    },
    selectmove: {
      from: "movetargets",
      runGenerators: ["findmoveresults"],
      link: "move"
    },
    selectcrush: { from: "crushtargets", link: "crush" }
  },
  commands: {
    move: {
      applyEffects: [
        { killat: "selecttower" },
        { morphin: ["madetowers", "towers"] },
        { spawnin: ["madewalls", "walls", ["player"]] }
      ],
      link: "endTurn"
    },
    crush: {
      applyEffects: [
        { morphat: ["selecttower", "walls"] },
        { killat: "selectcrush" }
      ],
      link: "endTurn"
    }
  }
};

export default murusgallicusFlow;
