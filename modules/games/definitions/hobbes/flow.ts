import { HobbesDefinition } from "./_types";

const hobbesFlow: HobbesDefinition["flow"] = {
  endGame: {
    regicide: {
      condition: { isempty: "oppunits" },
      show: "myunits",
    },
  },
  startTurn: {
    runGenerators: ["findmovetargets", "findnearbystones"],
    links: [
      "selectmovetarget",
      { if: [{ isempty: "vulnerable" }, "selectstone"] },
    ],
  },
  commands: {
    move: {
      applyEffects: [
        { stompat: [{ onlyin: "myunits" }, "selectmovetarget"] },
        { setturnvar: ["moved", 1] },
      ],
      runGenerator: "findnearbystones",
      link: {
        ifelse: [{ notempty: "vulnerable" }, "endTurn", "selectstone"],
      },
    },
    push: {
      applyEffects: [
        { moveat: ["selectstone", "selectpushtarget"] },
        {
          pushat: [
            { onlyin: "myunits" },
            { read: ["pushtargets", "selectpushtarget", "dir"] },
            { read: ["pushtargets", "selectpushtarget", "distance"] },
          ],
        },
      ],
      link: "endTurn",
    },
    pull: {
      applyEffects: [
        { moveat: [{ onlyin: "myunits" }, "selectpulltarget"] },
        {
          pushat: [
            "selectstone",
            { read: ["pulltargets", "selectpulltarget", "dir"] },
            { read: ["pulltargets", "selectpulltarget", "distance"] },
          ],
        },
      ],
      link: "endTurn",
    },
  },
  marks: {
    selectmovetarget: {
      from: {
        ifelse: [{ isempty: "vulnerable" }, "movetargets", "vulnerable"],
      },
      runGenerator: "findnearbystones",
      link: "move",
    },
    selectstone: {
      from: {
        ifelse: [
          { truthy: { turnvar: "moved" } },
          "nearbystonesaftermove",
          {
            playercase: [
              {
                ifelse: [
                  ["isFirstTurn"],
                  { exceptpos: ["nearbystonesnomove", { onlyin: "pie" }] },
                  "nearbystonesnomove",
                ],
              },
              "nearbystonesnomove",
            ],
          },
        ],
      },
      runGenerators: ["findpulltargets", "findpushtargets"],
      links: ["selectpushtarget", "selectpulltarget"],
    },
    selectpushtarget: {
      from: "pushtargets",
      link: "push",
    },
    selectpulltarget: {
      from: "pulltargets",
      link: "pull",
    },
  },
};

export default hobbesFlow;
