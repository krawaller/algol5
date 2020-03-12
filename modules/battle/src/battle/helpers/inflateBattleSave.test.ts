import { inflateBattleSave } from ".";
import atrium from "../../../../logic/dist/indiv/atrium";
import defs from "../../../../games/dist/lib";
import trafficlights from "../../../../logic/dist/indiv/trafficlights";
import { AlgolBattleSave, AlgolGame } from "../../../../types";

type InflationTest = Record<string, AlgolBattleSave>;
type InflationGameSuite = [AlgolGame, InflationTest];

const tests: InflationGameSuite[] = [
  [
    atrium,
    {
      singleTurn: { player: 2, turn: 1, path: [2], variantCode: "x" },
      simple: { player: 1, turn: 2, path: [1, 1, 1], variantCode: "x" },
      long: {
        player: 1,
        turn: 5,
        path: [2, 4, 4, 1, 1, 1, 1, 0, 0, 4, 5, 0],
        variantCode: "x",
      },
    },
  ],
  [
    trafficlights,
    {
      win: {
        player: 1,
        turn: 2,
        path: [7, 4, 10],
        ended: true,
        variantCode: "b",
      },
    },
  ],
];

describe("the inflateBattle helper", () => {
  for (const [game, suite] of tests) {
    game.setBoard(defs[game.gameId].boards.basic);
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
