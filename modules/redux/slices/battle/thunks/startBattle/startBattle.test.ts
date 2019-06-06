import { makeStartBattle } from "./";
import amazons from "../../../../../logic/dist/indiv/amazons";
import { makeStaticGameAPI } from "../../../../../battle/src/";
import { registerBattle } from "../../actions/registerBattle";
import { initialBattleState } from "../../initialState";
import { GameId } from "../../../../../battle/commands/helpers/_names";

const amazonsAPI = makeStaticGameAPI(amazons);

const startBattle = makeStartBattle(amazons);

describe("The startBattle thunk", () => {
  test("correctly registers a game", () => {
    const dispatch = jest.fn();

    const thunk = startBattle();

    const newBattleId = thunk(
      dispatch,
      () => ({ battle: initialBattleState }),
      undefined
    );

    const expectedAction = registerBattle({
      battle: amazonsAPI.newBattle(),
      battleId: newBattleId,
      gameId: amazons.gameId as GameId,
      activate: true,
    });

    const sentAction = dispatch.mock.calls[0][0];

    expect(expectedAction.payload).toEqual(sentAction.payload);
  });
});
