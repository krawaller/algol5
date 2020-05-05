import { SpeedsoccolotDefinition } from "./_types";

const speedsoccolotSetupBook: SpeedsoccolotDefinition["setups"] = {
  original: {
    ball: {
      0: ["d4"],
    },
    players: {
      1: [{ rect: ["b1", "g1"] }],
      2: [{ rect: ["b8", "g8"] }],
    },
  },
  basic: {
    ball: {
      0: ["d4"],
    },
    players: {
      1: [{ rect: ["b2", "f2"] }],
      2: [{ rect: ["b6", "f6"] }],
    },
  },
};

export default speedsoccolotSetupBook;
