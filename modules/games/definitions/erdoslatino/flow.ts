import { ErdoslatinoDefinition } from "./_types";

const erdoslatinoFlow: ErdoslatinoDefinition["flow"] = {
  endGame: {
    columncount: {
      condition: {
        same: [{ sizeof: "board" }, { sizeof: "units" }],
      },
      who: {
        ifelse: [
          {
            morethan: [
              { sizeof: "myownedcolumns" },
              { sizeof: "oppownedcolumns" },
            ],
          },
          ["player"],
          {
            ifelse: [
              {
                lessthan: [
                  { sizeof: "myownedcolumns" },
                  { sizeof: "oppownedcolumns" },
                ],
              },
              ["otherplayer"],
              0,
            ],
          },
        ],
      },
      show: {
        ifelse: [
          {
            morethan: [
              { sizeof: "myownedcolumns" },
              { sizeof: "oppownedcolumns" },
            ],
          },
          "myunits",
          {
            ifelse: [
              {
                lessthan: [
                  { sizeof: "myownedcolumns" },
                  { sizeof: "oppownedcolumns" },
                ],
              },
              "oppunits",
              ["empty"],
            ],
          },
        ],
      },
    },
  },
  startTurn: {
    runGenerators: ["findvisibilities", "findconquests"],
    link: "selecttarget",
  },
  commands: {
    place1: {
      applyEffects: [
        {
          spawnat: [
            "selecttarget",
            "lvl1",
            {
              ifelse: [
                { anyat: ["takencolumn", "selecttarget"] },
                { read: ["takencolumn", "selecttarget", "owner"] },
                {
                  ifelse: [
                    {
                      hascommonbits: [
                        { read: ["conquer", "selecttarget", "by"] },
                        1,
                      ],
                    },
                    ["player"],
                    {
                      ifelse: [
                        {
                          hascommonbits: [
                            { read: ["oppconquer", "selecttarget", "by"] },
                            1,
                          ],
                        },
                        ["otherplayer"],
                        0,
                      ],
                    },
                  ],
                },
              ],
            },
            {
              lvl: 1,
              bit: 1,
              bottom: 1,
              below: 0,
              top: 31,
              above: 0,
            },
          ],
        },
        {
          ifelse: [
            {
              hascommonbits: [{ read: ["conquer", "selecttarget", "by"] }, 1],
            },
            { adoptin: ["currentcolumn"] },
            {
              if: [
                {
                  hascommonbits: [
                    { read: ["oppconquer", "selecttarget", "by"] },
                    1,
                  ],
                },
                { adoptin: ["currentcolumn", ["otherplayer"]] },
              ],
            },
          ],
        },
      ],
      link: "endTurn",
    },
    place2: {
      applyEffects: [
        {
          spawnat: [
            "selecttarget",
            "lvl2",
            {
              ifelse: [
                { anyat: ["takencolumn", "selecttarget"] },
                { read: ["takencolumn", "selecttarget", "owner"] },
                {
                  ifelse: [
                    {
                      hascommonbits: [
                        { read: ["conquer", "selecttarget", "by"] },
                        2,
                      ],
                    },
                    ["player"],
                    {
                      ifelse: [
                        {
                          hascommonbits: [
                            { read: ["oppconquer", "selecttarget", "by"] },
                            2,
                          ],
                        },
                        ["otherplayer"],
                        0,
                      ],
                    },
                  ],
                },
              ],
            },
            {
              lvl: 2,
              bit: 2,
              bottom: 3,
              below: 1,
              top: 30,
              above: 28,
            },
          ],
        },
        {
          ifelse: [
            {
              hascommonbits: [{ read: ["conquer", "selecttarget", "by"] }, 2],
            },
            { adoptin: ["currentcolumn"] },
            {
              if: [
                {
                  hascommonbits: [
                    { read: ["oppconquer", "selecttarget", "by"] },
                    2,
                  ],
                },
                { adoptin: ["currentcolumn", ["otherplayer"]] },
              ],
            },
          ],
        },
      ],
      link: "endTurn",
    },

    place3: {
      applyEffects: [
        {
          spawnat: [
            "selecttarget",
            "lvl3",
            {
              ifelse: [
                { anyat: ["takencolumn", "selecttarget"] },
                { read: ["takencolumn", "selecttarget", "owner"] },
                {
                  ifelse: [
                    {
                      hascommonbits: [
                        { read: ["conquer", "selecttarget", "by"] },
                        4,
                      ],
                    },
                    ["player"],
                    {
                      ifelse: [
                        {
                          hascommonbits: [
                            { read: ["oppconquer", "selecttarget", "by"] },
                            4,
                          ],
                        },
                        ["otherplayer"],
                        0,
                      ],
                    },
                  ],
                },
              ],
            },
            {
              lvl: 3,
              bit: 4,
              bottom: 7,
              below: 3,
              top: 28,
              above: 24,
            },
          ],
        },
        {
          ifelse: [
            {
              hascommonbits: [{ read: ["conquer", "selecttarget", "by"] }, 4],
            },
            { adoptin: ["currentcolumn"] },
            {
              if: [
                {
                  hascommonbits: [
                    { read: ["oppconquer", "selecttarget", "by"] },
                    4,
                  ],
                },
                { adoptin: ["currentcolumn", ["otherplayer"]] },
              ],
            },
          ],
        },
      ],
      link: "endTurn",
    },
    place4: {
      applyEffects: [
        {
          spawnat: [
            "selecttarget",
            "lvl4",
            {
              ifelse: [
                { anyat: ["takencolumn", "selecttarget"] },
                { read: ["takencolumn", "selecttarget", "owner"] },
                {
                  ifelse: [
                    {
                      hascommonbits: [
                        { read: ["conquer", "selecttarget", "by"] },
                        8,
                      ],
                    },
                    ["player"],
                    {
                      ifelse: [
                        {
                          hascommonbits: [
                            { read: ["oppconquer", "selecttarget", "by"] },
                            8,
                          ],
                        },
                        ["otherplayer"],
                        0,
                      ],
                    },
                  ],
                },
              ],
            },
            {
              lvl: 4,
              bit: 8,
              bottom: 15,
              below: 7,
              top: 24,
              above: 16,
            },
          ],
        },
        {
          ifelse: [
            {
              hascommonbits: [{ read: ["conquer", "selecttarget", "by"] }, 8],
            },
            { adoptin: ["currentcolumn"] },
            {
              if: [
                {
                  hascommonbits: [
                    { read: ["oppconquer", "selecttarget", "by"] },
                    8,
                  ],
                },
                { adoptin: ["currentcolumn", ["otherplayer"]] },
              ],
            },
          ],
        },
      ],
      link: "endTurn",
    },
    place5: {
      applyEffects: [
        {
          spawnat: [
            "selecttarget",
            "lvl5",
            {
              ifelse: [
                { anyat: ["takencolumn", "selecttarget"] },
                { read: ["takencolumn", "selecttarget", "owner"] },
                {
                  ifelse: [
                    {
                      hascommonbits: [
                        { read: ["conquer", "selecttarget", "by"] },
                        16,
                      ],
                    },
                    ["player"],
                    {
                      ifelse: [
                        {
                          hascommonbits: [
                            { read: ["oppconquer", "selecttarget", "by"] },
                            16,
                          ],
                        },
                        ["otherplayer"],
                        0,
                      ],
                    },
                  ],
                },
              ],
            },
            {
              lvl: 5,
              bit: 16,
              bottom: 31,
              below: 0,
              top: 16,
              above: 0,
            },
          ],
        },
        {
          ifelse: [
            {
              hascommonbits: [{ read: ["conquer", "selecttarget", "by"] }, 16],
            },
            { adoptin: ["currentcolumn"] },
            {
              if: [
                {
                  hascommonbits: [
                    { read: ["oppconquer", "selecttarget", "by"] },
                    16,
                  ],
                },
                { adoptin: ["currentcolumn", ["otherplayer"]] },
              ],
            },
          ],
        },
      ],
      link: "endTurn",
    },
  },
  marks: {
    selecttarget: {
      from: { subtract: ["board", "units"] },
      runGenerators: ["findchosencolumn"],
      links: [
        {
          if: [
            {
              not: {
                hascommonbits: [{ read: ["sees", "selecttarget", "who"] }, 1],
              },
            },
            "place1",
          ],
        },
        {
          if: [
            {
              not: {
                hascommonbits: [{ read: ["sees", "selecttarget", "who"] }, 2],
              },
            },
            "place2",
          ],
        },
        {
          if: [
            {
              not: {
                hascommonbits: [{ read: ["sees", "selecttarget", "who"] }, 4],
              },
            },
            "place3",
          ],
        },
        {
          if: [
            {
              not: {
                hascommonbits: [{ read: ["sees", "selecttarget", "who"] }, 8],
              },
            },
            "place4",
          ],
        },
        {
          if: [
            {
              not: {
                hascommonbits: [{ read: ["sees", "selecttarget", "who"] }, 16],
              },
            },
            "place5",
          ],
        },
      ],
    },
  },
};

export default erdoslatinoFlow;
