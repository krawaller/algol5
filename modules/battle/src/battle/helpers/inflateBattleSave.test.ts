import { inflateBattleSave } from ".";
import atrium from "../../../../logic/dist/indiv/atrium";
import semaphor from "../../../../logic/dist/indiv/semaphor";
import { AlgolBattleSave, AlgolGame } from "../../../../types";

type InflationTest = Record<string, AlgolBattleSave>;
type InflationGameSuite = [AlgolGame, InflationTest];

const tests: InflationGameSuite[] = [
  [
    atrium,
    {
      singleTurn: { player: 2, turn: 1, path: [2] },
      simple: { player: 1, turn: 2, path: [1, 1, 1] },
      long: { player: 1, turn: 5, path: [2, 4, 4, 1, 1, 1, 1, 0, 0, 4, 5, 0] },
    },
  ],
  [
    semaphor,
    {
      win: { player: 1, turn: 0, path: [7, 4, 10] },
    },
  ],
];

describe("the inflateBattle helper", () => {
  for (const [game, suite] of tests) {
    for (const [name, save] of Object.entries(suite)) {
      it(`correctly inflates ${game.gameId} test ${name}`, () => {
        const battle = inflateBattleSave(game, save);
        if (save.turn === 0) {
          expect(battle.gameEndedBy).toBeTruthy();
          expect(battle.winner).toBe(save.player);
        } else {
          expect(battle.turnNumber).toBe(save.turn);
          expect(battle.player).toBe(save.player);
        }
        expect(battle.path).toEqual(save.path);
      });
    }
  }
});
