import { GogolBoard } from "./_types";

const gogolBoard: GogolBoard = {
  height: 8,
  width: 8,
  terrain: {
    homerow: {
      "1": [{ rect: ["a1", "h1"] }],
      "2": [{ rect: ["a8", "h8"] }]
    },
    edges: [
      { rect: ["a1", "a8"] },
      { rect: ["h1", "h8"] },
      { rect: ["b8", "g8"] },
      { rect: ["b1", "g1"] }
    ]
  }
};

export default gogolBoard;
