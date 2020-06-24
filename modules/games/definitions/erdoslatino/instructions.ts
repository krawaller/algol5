import { ErdoslatinoDefinition } from "./_types";

const erdoslatinoInstructions: ErdoslatinoDefinition["instructions"] = {
  startTurn: { line: ["Select a free spot to place a unit"] },
  selecttarget: {
    line: [
      "Press",
      {
        orlist: [
          {
            if: [
              { cmndavailable: "place1" },
              {
                line: [
                  "place1",
                  "for",
                  {
                    unittype: [
                      "lvl1",
                      {
                        ifelse: [
                          { anyat: ["takencolumn", "selecttarget"] },
                          { read: ["takencolumn", "selecttarget", "owner"] },
                          {
                            ifelse: [
                              { anyat: ["conquerwith1", "selecttarget"] },
                              ["player"],
                              0,
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            if: [
              { cmndavailable: "place2" },
              {
                line: [
                  "place2",
                  "for",
                  {
                    unittype: [
                      "lvl2",
                      {
                        ifelse: [
                          { anyat: ["takencolumn", "selecttarget"] },
                          { read: ["takencolumn", "selecttarget", "owner"] },
                          {
                            ifelse: [
                              { anyat: ["conquerwith2", "selecttarget"] },
                              ["player"],
                              0,
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            if: [
              { cmndavailable: "place3" },
              {
                line: [
                  "place3",
                  "for",
                  {
                    unittype: [
                      "lvl3",
                      {
                        ifelse: [
                          { anyat: ["takencolumn", "selecttarget"] },
                          { read: ["takencolumn", "selecttarget", "owner"] },
                          {
                            ifelse: [
                              { anyat: ["conquerwith3", "selecttarget"] },
                              ["player"],
                              0,
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            if: [
              { cmndavailable: "place4" },
              {
                line: [
                  "place4",
                  "for",
                  {
                    unittype: [
                      "lvl4",
                      {
                        ifelse: [
                          { anyat: ["takencolumn", "selecttarget"] },
                          { read: ["takencolumn", "selecttarget", "owner"] },
                          {
                            ifelse: [
                              { anyat: ["conquerwith4", "selecttarget"] },
                              ["player"],
                              0,
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            if: [
              { cmndavailable: "place5" },
              {
                line: [
                  "place5",
                  "for",
                  {
                    unittype: [
                      "lvl5",
                      {
                        ifelse: [
                          { anyat: ["takencolumn", "selecttarget"] },
                          { read: ["takencolumn", "selecttarget", "owner"] },
                          {
                            ifelse: [
                              { anyat: ["conquerwith5", "selecttarget"] },
                              ["player"],
                              0,
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default erdoslatinoInstructions;
