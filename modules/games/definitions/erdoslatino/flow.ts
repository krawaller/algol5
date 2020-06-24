import { ErdoslatinoDefinition } from "./_types";

const erdoslatinoFlow: ErdoslatinoDefinition["flow"] = {
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
                { anyat: ["conquerwith1", "selecttarget"] },
                ["player"],
                {
                  ifelse: [
                    { anyat: ["takencolumn", "selecttarget"] },
                    { read: ["takencolumn", "selecttarget", "owner"] },
                    0,
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
          if: [
            { anyat: ["conquerwith1", "selecttarget"] },
            { adoptin: ["currentcolumn"] },
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
                { anyat: ["conquerwith2", "selecttarget"] },
                ["player"],
                {
                  ifelse: [
                    { anyat: ["takencolumn", "selecttarget"] },
                    { read: ["takencolumn", "selecttarget", "owner"] },
                    0,
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
          if: [
            { anyat: ["conquerwith2", "selecttarget"] },
            { adoptin: ["currentcolumn"] },
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
                { anyat: ["conquerwith3", "selecttarget"] },
                ["player"],
                {
                  ifelse: [
                    { anyat: ["takencolumn", "selecttarget"] },
                    { read: ["takencolumn", "selecttarget", "owner"] },
                    0,
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
          if: [
            { anyat: ["conquerwith3", "selecttarget"] },
            { adoptin: ["currentcolumn"] },
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
                { anyat: ["conquerwith4", "selecttarget"] },
                ["player"],
                {
                  ifelse: [
                    { anyat: ["takencolumn", "selecttarget"] },
                    { read: ["takencolumn", "selecttarget", "owner"] },
                    0,
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
          if: [
            { anyat: ["conquerwith4", "selecttarget"] },
            { adoptin: ["currentcolumn"] },
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
                { anyat: ["conquerwith5", "selecttarget"] },
                ["player"],
                {
                  ifelse: [
                    { anyat: ["takencolumn", "selecttarget"] },
                    { read: ["takencolumn", "selecttarget", "owner"] },
                    0,
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
          if: [
            { anyat: ["conquerwith5", "selecttarget"] },
            { adoptin: ["currentcolumn"] },
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
