import { makeMakeMove } from "./";
import amazons from "../../../../../logic/dist/indiv/amazons";
import { makeStaticGameAPI } from "../../../../../battle/src/";
import {
  registerBattle,
  RegisterBattlePayload,
} from "../../actions/registerBattle";
import { initialBattleState } from "../../initialState";
import { GameId } from "../../../../../battle/commands/helpers/_names";
import { updateBattle } from "../../actions/updateBattle";

const amazonsAPI = makeStaticGameAPI(amazons);

const makeMove = makeMakeMove(amazons);

describe("The makeMove thunk", () => {
  test("correctly make a move", () => {
    const currentBattle = amazonsAPI.newBattle();
    const battleId = "NEWBATTLEID";
    const registerPayload: RegisterBattlePayload = {
      battle: currentBattle,
      gameId: amazons.gameId as GameId,
      battleId,
    };
    const currentState = registerBattle(registerPayload).reducer(
      { battle: initialBattleState },
      registerPayload
    );

    const expectedBattle = amazonsAPI.performAction(
      currentBattle,
      "mark",
      "a7"
    );

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(currentState);

    const thunk = makeMove(battleId, "mark", "a7");

    thunk(dispatch, getState, undefined);

    const expectedAction = updateBattle({
      battle: expectedBattle,
      battleId,
      gameId: amazons.gameId as GameId,
    });

    const sentAction = dispatch.mock.calls[0][0];

    expect(expectedAction.payload).toEqual(sentAction.payload);
  });
});
