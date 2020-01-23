import { AlgolBattleSave } from "../../types";
import { GameId } from "../../games/dist/list";
import { stringifySeed } from "./seed.stringify";
import { parseSeed } from "./seed.parse";

describe("the seed encoding", () => {
  const save: AlgolBattleSave = {
    ended: true,
    path: [1, 2, 3, 4, 5, 6],
    player: 1,
    turn: 27,
  };
  const gameId: GameId = "chameleon";
  it("handles regular case", () => {
    const encoded = stringifySeed(save, gameId);
    const decoded = parseSeed(encoded, gameId);
    expect(decoded).toEqual(save);
  });
});
