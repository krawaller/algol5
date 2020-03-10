import { MurusgallicusDefinition } from "./_types";

const murusgallicusFlow: MurusgallicusDefinition["flow"] = {
  startTurn: {
    links: ["selecttower", { ifruleset: ["advanced", "selectcatapult"] }],
  },
  endGame: {
    infiltration: {
      condition: { overlaps: ["myunits", "opphomerow"] },
      show: { intersect: ["myunits", "opphomerow"] },
    },
  },
  marks: {
    selecttower: {
      from: "mytowers",
      runGenerators: ["findmovetargets", "findcrushtargets"],
      links: ["selectmove", "selectcrush"],
    },
    selectmove: {
      from: "movetargets",
      runGenerator: "findmoveresults",
      link: "move",
    },
    selectcrush: {
      from: "crushtargets",
      links: [
        "crush",
        {
          ifruleset: [
            "advanced",
            { if: [{ anyat: ["oppcatapults", "selectcrush"] }, "sacrifice"] },
          ],
        },
      ],
    },
    selectcatapult: {
      from: "mycatapults",
      runGenerator: "findfiretargets",
      link: "selectfire",
    },
    selectfire: { from: "firetargets", link: "fire" },
  },
  commands: {
    move: {
      applyEffects: [
        { killat: "selecttower" },
        { morphin: ["madecatapults", "catapults"] },
        { morphin: ["madetowers", "towers"] },
        { spawnin: ["madewalls", "walls", ["player"]] },
      ],
      link: "endTurn",
    },
    crush: {
      applyEffects: [
        { morphat: ["selecttower", "walls"] },
        {
          ifelse: [
            { anyat: ["oppcatapults", "selectcrush"] },
            { morphat: ["selectcrush", "towers"] },
            { killat: "selectcrush" },
          ],
        },
      ],
      link: "endTurn",
    },
    sacrifice: {
      applyEffects: [
        { morphat: ["selectcrush", "walls"] },
        { killat: "selecttower" },
      ],
      link: "endTurn",
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
                        "walls",
                      ],
                    },
                  ],
                },
                { spawnat: ["selectfire", "walls", ["player"]] },
              ],
            },
          ],
        },
        { morphat: ["selectcatapult", "towers"] },
      ],
      link: "endTurn",
    },
  },
};

export default murusgallicusFlow;
