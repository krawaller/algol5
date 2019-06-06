import { makeMakeMove } from "./";
import amazons from "../../../../../logic/dist/indiv/amazons";
import { makeStaticGameAPI } from "../../../../../battle/src/";
import { registerBattle } from "../../actions/registerBattle";

const amazonsAPI = makeStaticGameAPI(amazons);
const makeMove = makeMakeMove(amazons);
import { makeStore } from "../../../../store";

describe("The makeMove thunk", () => {
  test("correctly makes a move", () => {
    const newBattle = amazonsAPI.newBattle();
    const store = makeStore();
    const battleId = "NEWBATTLEID";
    store.dispatch(
      registerBattle({
        battle: newBattle,
        battleId,
        gameId: "amazons",
        activate: true,
      })
    );
    store.dispatch(makeMove("mark", "a7"));
    expect(
      store.getState().battle.games.amazons!.battles[battleId].battle
    ).toEqual(amazonsAPI.performAction(newBattle, "mark", "a7"));
  });
});
