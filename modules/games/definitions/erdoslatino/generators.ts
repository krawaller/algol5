// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { ErdoslatinoDefinition } from "./_types";

const erdoslatinoGenerators: ErdoslatinoDefinition["generators"] = {
  findchosencolumn: {
    type: "walker",
    dirs: [1, 5],
    start: "selecttarget",
    startasstep: true,
    draw: {
      steps: {
        tolayer: "currentcolumn",
      },
    },
  },
  findconquests: {
    type: "walker",
    starts: "almost",
    dirs: [1, 5],
    draw: {
      steps: [
        {
          unlessover: "units",
          condition: {
            and: [
              { same: [["dir"], 5] },
              { truthy: { read: ["sees", ["target"], "northof"] } },
            ],
          },
          tolayer: "conquer",
          include: {
            by: {
              addbitsto: [
                "conquer",
                ["target"],
                "by",
                {
                  bitdiff: [
                    31,
                    { read: ["sees", ["target"], "northof"] },
                    { read: ["units", ["start"], "top"] },
                  ],
                },
              ],
            },
          },
        },
        {
          unlessover: "units",
          condition: {
            and: [
              { same: [["dir"], 1] },
              { truthy: { read: ["sees", ["target"], "southof"] } },
            ],
          },
          tolayer: "oppconquer",
          include: {
            by: {
              addbitsto: [
                "oppconquer",
                ["target"],
                "by",
                {
                  bitdiff: [
                    31,
                    { read: ["sees", ["target"], "southof"] },
                    { read: ["units", ["start"], "bottom"] },
                  ],
                },
              ],
            },
          },
        },
        {
          unlessover: "units",
          condition: {
            truthy: {
              read: [
                "almost",
                ["start"],
                { ifelse: [{ same: [["dir"], 1] }, "ascnorth", "ascsouth"] },
              ],
            },
          },
          include: {
            by: {
              addbitsto: [
                {
                  ifelse: [
                    { same: [["dir"], 1] },
                    { playercase: ["conquer", "oppconquer"] },
                    { playercase: ["oppconquer", "conquer"] },
                  ],
                },
                ["target"],
                "by",
                { read: ["units", ["start"], "above"] },
              ],
            },
          },
          tolayer: {
            ifelse: [
              { same: [["dir"], 1] },
              { playercase: ["conquer", "oppconquer"] },
              { playercase: ["oppconquer", "conquer"] },
            ],
          },
        },
        {
          unlessover: "units",
          condition: {
            truthy: {
              read: [
                "almost",
                ["start"],
                { ifelse: [{ same: [["dir"], 1] }, "descnorth", "descsouth"] },
              ],
            },
          },
          include: {
            by: {
              addbitsto: [
                {
                  ifelse: [
                    { same: [["dir"], 1] },
                    { playercase: ["oppconquer", "conquer"] },
                    { playercase: ["conquer", "oppconquer"] },
                  ],
                },
                ["target"],
                "by",
                { read: ["units", ["start"], "below"] },
              ],
            },
          },
          tolayer: {
            ifelse: [
              { same: [["dir"], 1] },
              { playercase: ["oppconquer", "conquer"] },
              { playercase: ["conquer", "oppconquer"] },
            ],
          },
        },
      ],
    },
  },
  findvisibilities: {
    type: "walker",
    starts: "units",
    dirs: "ortho",
    draw: {
      last: {
        condition: {
          and: [
            { same: [["dir"], 1] },
            { noneat: ["neutralunits", ["start"]] },
          ],
        },
        unlessover: "ownedcolumns",
        tolayer: "ownedcolumns",
        include: {
          owner: { read: ["units", ["start"], "owner"] },
        },
      },
      steps: [
        {
          unlessover: "units",
          tolayer: "sees",
          include: {
            who: {
              addbitsto: [
                "sees",
                ["target"],
                "who",
                { read: ["units", ["start"], "bit"] },
              ],
            },
            northof: {
              ifelse: [
                { same: [["dir"], 1] },
                {
                  lowest: [
                    { read: ["sees", ["target"], "northof"] },
                    { read: ["units", ["start"], "bottom"] },
                  ],
                },
                { read: ["sees", ["target"], "northof"] },
              ],
            },
            southof: {
              ifelse: [
                { same: [["dir"], 5] },
                {
                  highest: [
                    { read: ["sees", ["target"], "southof"] },
                    { read: ["units", ["start"], "top"] },
                  ],
                },
                { read: ["sees", ["target"], "southof"] },
              ],
            },
          },
        },
        {
          condition: {
            and: [
              { noneat: ["neutralunits", ["start"]] },
              { vertical: ["dir"] },
              { noneat: ["units", ["target"]] },
            ],
          },
          tolayer: "takencolumn",
          include: {
            owner: { read: ["units", ["start"], "owner"] },
          },
        },
        {
          condition: {
            and: [
              { vertical: ["dir"] },
              { anyat: ["neutralunits", ["target"]] },
              { anyat: ["neutralunits", ["start"]] },
            ],
          },
          tolayer: "almost",
          include: {
            ascnorth: {
              ifelse: [
                {
                  and: [
                    { same: [["dir"], 1] },
                    {
                      morethan: [
                        { read: ["units", ["target"], "bit"] },
                        { read: ["units", ["start"], "bit"] },
                      ],
                    },
                  ],
                },
                1,
                { read: ["almost", ["target"], "ascnorth"] },
              ],
            },
            descnorth: {
              ifelse: [
                {
                  and: [
                    { same: [["dir"], 1] },
                    {
                      lessthan: [
                        { read: ["units", ["target"], "bit"] },
                        { read: ["units", ["start"], "bit"] },
                      ],
                    },
                  ],
                },
                1,
                { read: ["almost", ["target"], "descnorth"] },
              ],
            },
            ascsouth: {
              ifelse: [
                {
                  and: [
                    { same: [["dir"], 5] },
                    {
                      morethan: [
                        { read: ["units", ["target"], "bit"] },
                        { read: ["units", ["start"], "bit"] },
                      ],
                    },
                  ],
                },
                1,
                { read: ["almost", ["target"], "ascsouth"] },
              ],
            },
            descsouth: {
              ifelse: [
                {
                  and: [
                    { same: [["dir"], 5] },
                    {
                      lessthan: [
                        { read: ["units", ["target"], "bit"] },
                        { read: ["units", ["start"], "bit"] },
                      ],
                    },
                  ],
                },
                1,
                { read: ["almost", ["target"], "descsouth"] },
              ],
            },
          },
        },
      ],
    },
  },
};

export default erdoslatinoGenerators;
