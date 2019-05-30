import { MurusgallicusAI } from "./_types";

const murusgallicusAI: MurusgallicusAI = {
  terrain: {
    threatrow: { "1": [{ rect: ["a3", "h3"] }], "2": [{ rect: ["a5", "h5"] }] },
  },
  grids: {
    basic1: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [2, 3, 4, 4, 4, 4, 3, 2],
      [0, 0, 3, 3, 3, 3, 0, 0],
      [0, 0, 2, 2, 2, 2, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
    basic2: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 0, 2, 2, 2, 2, 0, 0],
      [0, 0, 3, 3, 3, 3, 0, 0],
      [2, 3, 4, 4, 4, 4, 3, 2],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  generators: {
    findmymoves: {
      type: "walker",
      dirs: "rose",
      blocks: { union: ["towers", "oppwalls"] },
      starts: "mytowers",
      max: 2,
      draw: {
        steps: {
          condition: {
            and: [{ same: [["walklength"], 2] }, { same: [["step"], 2] }],
          },
          tolayer: "mymoves",
        },
      },
    },
    findoppmoves: {
      type: "walker",
      dirs: "rose",
      blocks: { union: ["towers", "mywalls"] },
      starts: "opptowers",
      max: 2,
      draw: {
        steps: {
          condition: {
            and: [{ same: [["walklength"], 2] }, { same: [["step"], 2] }],
          },
          tolayer: "oppmoves",
        },
      },
    },
    findoppthreats: {
      type: "filter",
      layer: "mythreatrow",
      condition: { anyat: ["oppmoves", ["target"]] },
      tolayer: {
        ifelse: [
          { anyat: ["oppwalls", ["target"]] },
          "oppheavythreats",
          "opplightthreats",
        ],
      },
    },
  },
  aspects: {
    mymoves: { sizeof: "mymoves" },
    mytowerpos: { gridin: [{ playercase: ["basic1", "basic2"] }, "mytowers"] },
    mywallpos: { gridin: [{ playercase: ["basic1", "basic2"] }, "mywalls"] },
    oppmoves: { sizeof: "oppmoves" },
    mytowercount: { sizeof: "mytowers" },
    oppwinmoves: { sizeof: { union: ["oppmoves", "myhomerow"] } },
    opplightthreats: { sizeof: "opplightthreats" },
    oppheavythreats: { sizeof: "oppheavythreats" },
  },
  brains: {
    Steve: {
      generators: ["findoppmoves", "findoppthreats"],
      plus: { mytowercount: 2, mywallpos: 1, mytowerpos: 2 },
      minus: { oppwinmoves: 10000, opplightthreats: 20, oppheavythreats: 500 },
    },
    Joe: {
      generators: ["findoppmoves"],
      plus: { mytowercount: 2, mywallpos: 1, mytowerpos: 2 },
      minus: { oppwinmoves: 100 },
    },
    Clive: {
      generators: ["findmymoves", "findoppmoves"],
      plus: { mymoves: 1, mytowerpos: 3, mywallpos: 1 },
      minus: { oppmoves: 1 },
    },
  },
};

export default murusgallicusAI;
