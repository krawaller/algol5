import { makeStartBattle } from "./";
import amazons from "../../../../../logic/dist/indiv/amazons";
import { makeStaticGameAPI } from "../../../../../battle/src/";

import { makeStore } from "../../../../store";

const amazonsAPI = makeStaticGameAPI(amazons);

const startBattle = makeStartBattle(amazons);

describe("The startBattle thunk", () => {
  test("correctly registers a game", () => {
    const store = makeStore();
    const battleId = (store.dispatch(startBattle()) as unknown) as string;

    expect(
      store.getState().battle.games["amazons"]!.battles[battleId]!.battle
    ).toEqual(amazonsAPI.newBattle());
  });
});
