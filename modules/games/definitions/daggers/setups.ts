import { DaggersSetupBook } from "./_types";

const daggersSetupBook: DaggersSetupBook = {
  basic: {
    crowns: { "1": ["d8", "e8"], "2": ["c1", "f1"] },
    daggers: {
      "1": [{ rect: ["c7", "f7"] }],
      "2": ["c3", "f3", { rect: ["b2", "g2"] }]
    }
  }
};

export default daggersSetupBook;
