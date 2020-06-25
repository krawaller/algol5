import { ErdoslatinoDefinition } from "./_types";

const erdoslatinoFlow: ErdoslatinoDefinition["flow"] = {
  endGame: {
    dominance: {
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
    runGenerator: "findvisibilities",
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
                    { anyat: ["conquerwith1", "selecttarget"] },
                    ["player"],
                    {
                      ifelse: [
                        { anyat: ["oppconquerwith1", "selecttarget"] },
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
            },
          ],
        },
        {
          ifelse: [
            { anyat: ["conquerwith1", "selecttarget"] },
            { adoptin: ["currentcolumn"] },
            {
              if: [
                { anyat: ["oppconquerwith1", "selecttarget"] },
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
                    { anyat: ["conquerwith2", "selecttarget"] },
                    ["player"],
                    {
                      ifelse: [
                        { anyat: ["oppconquerwith2", "selecttarget"] },
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
            },
          ],
        },
        {
          ifelse: [
            { anyat: ["conquerwith2", "selecttarget"] },
            { adoptin: ["currentcolumn"] },
            {
              if: [
                { anyat: ["oppconquerwith2", "selecttarget"] },
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
                    { anyat: ["conquerwith3", "selecttarget"] },
                    ["player"],
                    {
                      ifelse: [
                        { anyat: ["oppconquerwith3", "selecttarget"] },
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
            },
          ],
        },
        {
          ifelse: [
            { anyat: ["conquerwith3", "selecttarget"] },
            { adoptin: ["currentcolumn"] },
            {
              if: [
                { anyat: ["oppconquerwith3", "selecttarget"] },
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
                    { anyat: ["conquerwith4", "selecttarget"] },
                    ["player"],
                    {
                      ifelse: [
                        { anyat: ["oppconquerwith4", "selecttarget"] },
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
            },
          ],
        },
        {
          ifelse: [
            { anyat: ["conquerwith4", "selecttarget"] },
            { adoptin: ["currentcolumn"] },
            {
              if: [
                { anyat: ["oppconquerwith4", "selecttarget"] },
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
                    { anyat: ["conquerwith5", "selecttarget"] },
                    ["player"],
                    {
                      ifelse: [
                        { anyat: ["oppconquerwith5", "selecttarget"] },
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
            },
          ],
        },
        {
          ifelse: [
            { anyat: ["conquerwith5", "selecttarget"] },
            { adoptin: ["currentcolumn"] },
            {
              if: [
                { anyat: ["oppconquerwith5", "selecttarget"] },
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
      runGenerators: [
        {
          if: [
            { noneat: ["takencolumn", "selecttarget"] },
            {
              multi: [
                "findchosencolumn",
                "findupwardends",
                "finddownwardends",
                "findmiddle2",
                "findmiddle3",
                "findmiddle4",
                "findoppupwardends",
                "findoppdownwardends",
                "findoppmiddle2",
                "findoppmiddle3",
                "findoppmiddle4",
              ],
            },
          ],
        },
      ],
      links: [
        { if: [{ noneat: ["sees1", "selecttarget"] }, "place1"] },
        { if: [{ noneat: ["sees2", "selecttarget"] }, "place2"] },
        { if: [{ noneat: ["sees3", "selecttarget"] }, "place3"] },
        { if: [{ noneat: ["sees4", "selecttarget"] }, "place4"] },
        { if: [{ noneat: ["sees5", "selecttarget"] }, "place5"] },
      ],
    },
  },
};

export default erdoslatinoFlow;
