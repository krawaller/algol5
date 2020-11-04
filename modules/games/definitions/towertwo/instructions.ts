import { TowertwoDefinition } from "./_types";

const towertwoInstructions: TowertwoDefinition["instructions"] = {
  startTurn: {
    line: [
      "3 actions remaining.",
      {
        ifelse: [
          {
            truthy: {
              battlevar: { playercase: ["plr1wounded", "plr2wounded"] },
            },
          },
          {
            line: [
              "Press",
              "heal",
              "to heal",
              {
                ifelse: [
                  {
                    same: [
                      1,
                      {
                        battlevar: {
                          playercase: ["plr1wounded", "plr2wounded"],
                        },
                      },
                    ],
                  },
                  { line: ["your wounded soldier"] },
                  {
                    line: [
                      "one of your",
                      {
                        value: {
                          battlevar: {
                            playercase: ["plr1wounded", "plr2wounded"],
                          },
                        },
                      },
                      "wounded soldiers",
                    ],
                  },
                ],
              },
              ", or select",
            ],
          },
          { line: ["Select"] },
        ],
      },
      {
        orlist: [
          { if: [{ notempty: "myunits" }, { line: ["soldiers", "to move"] }] },
          {
            if: [
              {
                morethan: [
                  8,
                  {
                    sum: [
                      {
                        battlevar: {
                          playercase: ["plr1wounded", "plr2wounded"],
                        },
                      },
                      { sizeof: "myunits" },
                    ],
                  },
                ],
              },
              { line: ["base to deploy from"] },
            ],
          },
        ],
      },
    ],
  },
  selectsource: {
    ifelse: [
      { anyat: ["units", "selectsource"] },
      { line: ["Select where to move", { unitat: "selectsource" }] },
      {
        line: [
          "Press",
          "deploy",
          "to spawn one of your",
          {
            value: {
              minus: [
                8,
                { sizeof: "myunits" },
                { battlevar: { playercase: ["plr1wounded", "plr2wounded"] } },
              ],
            },
          },
          "available",
          "soldiers",
          "at",
          "selectsource",
          {
            if: [
              { notempty: "victims" },
              { line: ["and wound", { unitlist: "victims" }] },
            ],
          },
        ],
      },
    ],
  },
  selectmovetarget: {
    line: [
      "Press",
      "move",
      "to spend",
      { value: { read: ["movetargets", "selectmovetarget", "dist"] } },
      "action points for",
      { unitat: "selectsource" },
      "to go to",
      "selectmovetarget",
      {
        if: [
          { notempty: "victims" },
          { line: ["and wound", { unitlist: "victims" }] },
        ],
      },
    ],
  },
  move: {
    ifelse: [
      { same: [{ turnvar: "spent" }, 3] },
      {
        line: [
          { text: "Press " },
          "endTurn",
          {
            text: ` to submit your moves and hand over to `,
          },
          {
            player: ["otherplayer"],
          },
        ],
      },
      {
        line: [
          { value: { minus: [3, { turnvar: "spent" }] } },
          {
            ifelse: [{ same: [{ turnvar: "spent" }, 2] }, "action", "actions"],
          },
          "remaining!",
          {
            ifelse: [
              {
                truthy: {
                  battlevar: { playercase: ["plr1wounded", "plr2wounded"] },
                },
              },
              {
                line: [
                  "Press",
                  "heal",
                  "to heal",
                  {
                    ifelse: [
                      {
                        same: [
                          1,
                          {
                            battlevar: {
                              playercase: ["plr1wounded", "plr2wounded"],
                            },
                          },
                        ],
                      },
                      { line: ["your wounded soldier"] },
                      {
                        line: [
                          "one of your",
                          {
                            value: {
                              battlevar: {
                                playercase: ["plr1wounded", "plr2wounded"],
                              },
                            },
                          },
                          "wounded soldiers",
                        ],
                      },
                    ],
                  },
                  ", or select",
                ],
              },
              { line: ["Select"] },
            ],
          },
          {
            orlist: [
              {
                if: [
                  { notempty: "myunits" },
                  { line: ["soldiers", "to move"] },
                ],
              },
              {
                if: [
                  {
                    and: [
                      {
                        morethan: [
                          8,
                          {
                            sum: [
                              {
                                battlevar: {
                                  playercase: ["plr1wounded", "plr2wounded"],
                                },
                              },
                              { sizeof: "myunits" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  { line: ["base to deploy from"] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  deploy: {
    ifelse: [
      { same: [{ turnvar: "spent" }, 3] },
      {
        line: [
          { text: "Press " },
          "endTurn",
          {
            text: ` to submit your moves and hand over to `,
          },
          {
            player: ["otherplayer"],
          },
        ],
      },
      {
        line: [
          { value: { minus: [3, { turnvar: "spent" }] } },
          {
            ifelse: [{ same: [{ turnvar: "spent" }, 2] }, "action", "actions"],
          },
          "remaining!",
          {
            ifelse: [
              {
                truthy: {
                  battlevar: { playercase: ["plr1wounded", "plr2wounded"] },
                },
              },
              {
                line: [
                  "Press",
                  "heal",
                  "to heal",
                  {
                    ifelse: [
                      {
                        same: [
                          1,
                          {
                            battlevar: {
                              playercase: ["plr1wounded", "plr2wounded"],
                            },
                          },
                        ],
                      },
                      { line: ["your wounded soldier"] },
                      {
                        line: [
                          "one of your",
                          {
                            value: {
                              battlevar: {
                                playercase: ["plr1wounded", "plr2wounded"],
                              },
                            },
                          },
                          "wounded soldiers",
                        ],
                      },
                    ],
                  },
                  ", or select",
                ],
              },
              { line: ["Select"] },
            ],
          },
          {
            orlist: [
              {
                if: [
                  { notempty: "myunits" },
                  { line: ["soldiers", "to move"] },
                ],
              },
              {
                if: [
                  {
                    and: [
                      {
                        morethan: [
                          8,
                          {
                            sum: [
                              {
                                battlevar: {
                                  playercase: ["plr1wounded", "plr2wounded"],
                                },
                              },
                              { sizeof: "myunits" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  { line: ["base to deploy from"] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  heal: {
    ifelse: [
      { same: [{ turnvar: "spent" }, 3] },
      {
        line: [
          { text: "Press " },
          "endTurn",
          {
            text: ` to submit your moves and hand over to `,
          },
          {
            player: ["otherplayer"],
          },
        ],
      },
      {
        line: [
          { value: { minus: [3, { turnvar: "spent" }] } },
          {
            ifelse: [{ same: [{ turnvar: "spent" }, 2] }, "action", "actions"],
          },
          "remaining!",
          {
            ifelse: [
              {
                truthy: {
                  battlevar: { playercase: ["plr1wounded", "plr2wounded"] },
                },
              },
              {
                line: [
                  "Press",
                  "heal",
                  "to heal",
                  {
                    ifelse: [
                      {
                        same: [
                          1,
                          {
                            battlevar: {
                              playercase: ["plr1wounded", "plr2wounded"],
                            },
                          },
                        ],
                      },
                      { line: ["your wounded soldier"] },
                      {
                        line: [
                          "one of your",
                          {
                            value: {
                              battlevar: {
                                playercase: ["plr1wounded", "plr2wounded"],
                              },
                            },
                          },
                          "wounded soldiers",
                        ],
                      },
                    ],
                  },
                  ", or select",
                ],
              },
              { line: ["Select"] },
            ],
          },
          {
            orlist: [
              {
                if: [
                  { notempty: "myunits" },
                  { line: ["soldiers", "to move"] },
                ],
              },
              {
                if: [
                  {
                    and: [
                      {
                        morethan: [
                          8,
                          {
                            sum: [
                              {
                                battlevar: {
                                  playercase: ["plr1wounded", "plr2wounded"],
                                },
                              },
                              { sizeof: "myunits" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  { line: ["base to deploy from"] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default towertwoInstructions;
