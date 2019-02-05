import { ShoveoffFlow } from "./_types";

const shoveoffFlow: ShoveoffFlow = {
  TODO: "findaffected SHOULD BE AN OFFSET",
  endGame: {
    madeline: {
      condition: { notempty: "fourinarow" },
      show: "fourinarow"
    }
  },
  startTurn: {
    link: "selectpushpoint"
  },
  marks: {
    selectpushpoint: {
      from: "edge",
      runGenerators: ["findaffected", "findresults"],
      links: [
        { if: [{ notempty: "spawnsouth" }, "south"] },
        { if: [{ notempty: "spawnnorth" }, "north"] },
        { if: [{ notempty: "spawnwest" }, "west"] },
        { if: [{ notempty: "spawneast" }, "east"] }
      ]
    }
  },
  commands: {
    north: {
      applyEffects: [
        { killat: { onlyin: "squishnorth" } },
        { pushin: ["pushnorth", 1, 1] },
        {
          spawnat: [
            { onlyin: "spawnnorth" },
            "soldiers",
            {
              ifelse: [{ morethan: [8, { sizeof: "myunits" }] }, ["player"], 0]
            }
          ]
        }
      ],
      runGenerator: "findfourinarow",
      link: "endturn"
    },
    south: {
      applyEffects: [
        { killat: { onlyin: "squishsouth" } },
        { pushin: ["pushsouth", 1, 1] },
        {
          spawnat: [
            { onlyin: "spawnsouth" },
            "soldiers",
            {
              ifelse: [{ morethan: [8, { sizeof: "myunits" }] }, ["player"], 0]
            }
          ]
        }
      ],
      runGenerator: "findfourinarow",
      link: "endturn"
    },
    east: {
      applyEffects: [
        { killat: { onlyin: "squisheast" } },
        { pushin: ["pusheast", 1, 1] },
        {
          spawnat: [
            { onlyin: "spawneast" },
            "soldiers",
            {
              ifelse: [{ morethan: [8, { sizeof: "myunits" }] }, ["player"], 0]
            }
          ]
        }
      ],
      runGenerator: "findfourinarow",
      link: "endturn"
    },
    west: {
      applyEffects: [
        { killat: { onlyin: "squishwest" } },
        { pushin: ["pushwest", 1, 1] },
        {
          spawnat: [
            { onlyin: "spawnwest" },
            "soldiers",
            {
              ifelse: [{ morethan: [8, { sizeof: "myunits" }] }, ["player"], 0]
            }
          ]
        }
      ],
      runGenerator: "findfourinarow",
      link: "endturn"
    }
  }
};

export default shoveoffFlow;
