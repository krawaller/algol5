import { TobitoDefinition } from "./_types";

const tobitoFlow: TobitoDefinition["flow"] = {
  endGame: {
    fullbase: {
      condition: {
        same: [
          { sizeof: "mybase" },
          { sizeof: { intersect: ["mybase", "units"] } },
        ],
      },
      who: ["otherplayer"],
      show: "mybase",
      prio: 1,
    },
    invasion: {
      condition: {
        same: [
          { sizeof: "oppbase" },
          { sizeof: { intersect: ["oppbase", "myunits"] } },
        ],
      },
      show: "myunits",
      prio: 2,
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
            { anyat: ["oppbase", "selectmovetarget"] },
            { morphat: ["selectunit", "finishers"] },
          ],
        },
        { moveat: ["selectunit", "selectmovetarget"] },
      ],
      runGenerator: "findrelocatees",
      link: {
        ifelse: [{ isempty: "relocatees" }, "endTurn", "selectrelocatee"],
      },
    },
    relocate: {
      applyEffects: [
        {
          if: [
            { anyat: ["mybase", "selectrelocationtarget"] },
            { morphat: ["selectrelocatee", "finishers"] },
          ],
        },
        { moveat: ["selectrelocatee", "selectrelocationtarget"] },
      ],
      link: {
        ifelse: [
          {
            isempty: {
              intersect: ["relocatees", { subtract: ["runners", "myunits"] }],
            },
          },
          "endTurn",
          "selectrelocatee",
        ],
      },
    },
  },
  marks: {
    selectunit: {
      from: "myrunners",
      runGenerator: "findmovetargets",
      link: "selectmovetarget",
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move",
    },
    selectrelocatee: {
      from: { intersect: ["relocatees", { subtract: ["runners", "myunits"] }] },
      link: "selectrelocationtarget",
    },
    selectrelocationtarget: {
      from: {
        ifelse: [
          { anyat: ["neutralrunners", "selectrelocatee"] },
          { subtract: ["board", "units", "relocatees", "base"] },
          { subtract: ["board", "units", "relocatees"] },
        ],
      },
      link: "relocate",
    },
  },
};

export default tobitoFlow;
