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
  findmiddle2: {
    type: "filter",
    layer: "currentcolumn",
    condition: {
      and: [
        { noneat: ["units", ["target"]] },
        { anyat: ["above1", ["target"]] },
        {
          or: [
            { anyat: ["below3", ["target"]] },
            { anyat: ["below4", ["target"]] },
            { anyat: ["below5", ["target"]] },
          ],
        },
      ],
    },
    tolayer: "conquerwith2",
  },
  findmiddle3: {
    type: "filter",
    layer: "currentcolumn",
    condition: {
      and: [
        { noneat: ["units", ["target"]] },
        {
          or: [
            { anyat: ["above1", ["target"]] },
            { anyat: ["above2", ["target"]] },
          ],
        },
        {
          or: [
            { anyat: ["below4", ["target"]] },
            { anyat: ["below5", ["target"]] },
          ],
        },
      ],
    },
    tolayer: "conquerwith3",
  },
  findmiddle4: {
    type: "filter",
    layer: "currentcolumn",
    condition: {
      and: [
        { noneat: ["units", ["target"]] },
        {
          or: [
            { anyat: ["above1", ["target"]] },
            { anyat: ["above2", ["target"]] },
            { anyat: ["above3", ["target"]] },
          ],
        },
        { anyat: ["below5", ["target"]] },
      ],
    },
    tolayer: "conquerwith4",
  },
  finddownwardends: {
    type: "walker",
    starts: { intersect: ["downwards", "currentcolumn"] },
    dir: { playercase: [5, 1] },
    draw: {
      steps: [
        {
          unlessover: "units",
          condition: { morethan: [{ read: ["units", ["start"], "lvl"] }, 3] },
          tolayer: "conquerwith3",
        },
        {
          unlessover: "units",
          condition: { morethan: [{ read: ["units", ["start"], "lvl"] }, 2] },
          tolayer: "conquerwith2",
        },
        {
          unlessover: "units",
          tolayer: "conquerwith1",
        },
      ],
    },
  },
  findupwardends: {
    type: "walker",
    starts: { intersect: ["upwards", "currentcolumn"] },
    dir: { playercase: [1, 5] },
    draw: {
      steps: [
        {
          unlessover: "units",
          condition: { lessthan: [{ read: ["units", ["start"], "lvl"] }, 3] },
          tolayer: "conquerwith3",
        },
        {
          unlessover: "units",
          condition: { lessthan: [{ read: ["units", ["start"], "lvl"] }, 4] },
          tolayer: "conquerwith4",
        },
        {
          unlessover: "units",
          tolayer: "conquerwith5",
        },
      ],
    },
  },
  findvisibilities: {
    type: "walker",
    starts: "units",
    dirs: "ortho",
    draw: {
      steps: [
        {
          tolayer: {
            indexlist: [
              { read: ["units", ["start"], "lvl"] },
              "FOOBAR",
              "sees1",
              "sees2",
              "sees3",
              "sees4",
              "sees5",
            ],
          },
        },
        {
          condition: { same: [["dir"], { playercase: [1, 5] }] },
          tolayer: {
            indexlist: [
              { read: ["units", ["start"], "lvl"] },
              "FOOBAR",
              "above1",
              "above2",
              "above3",
              "above4",
              "above5",
            ],
          },
        },
        {
          condition: { same: [["dir"], { playercase: [5, 1] }] },
          tolayer: {
            indexlist: [
              { read: ["units", ["start"], "lvl"] },
              "FOOBAR",
              "below1",
              "below2",
              "below3",
              "below4",
              "below5",
            ],
          },
        },
        {
          condition: {
            and: [
              { noneat: ["neutralunits", ["start"]] },
              { or: [{ same: [["dir"], 1] }, { same: [["dir"], 5] }] },
            ],
          },
          tolayer: "takencolumn",
          include: {
            owner: {
              ifelse: [
                { anyat: ["myunits", ["start"]] },
                ["player"],
                ["otherplayer"],
              ],
            },
          },
        },
        {
          condition: {
            and: [
              { same: [["dir"], { playercase: [1, 5] }] },
              { anyat: ["units", ["target"]] },
              {
                morethan: [
                  { read: ["units", ["target"], "lvl"] },
                  { read: ["units", ["start"], "lvl"] },
                ],
              },
            ],
          },
          tolayer: "upwards",
          include: {
            lvl: { read: ["units", ["target"], "lvl"] },
          },
        },
        {
          condition: {
            and: [
              { same: [["dir"], { playercase: [5, 1] }] },
              { anyat: ["units", ["target"]] },
              {
                lessthan: [
                  { read: ["units", ["target"], "lvl"] },
                  { read: ["units", ["start"], "lvl"] },
                ],
              },
            ],
          },
          tolayer: "downwards",
          include: {
            lvl: { read: ["units", ["target"], "lvl"] },
          },
        },
      ],
    },
  },
};

export default erdoslatinoGenerators;
