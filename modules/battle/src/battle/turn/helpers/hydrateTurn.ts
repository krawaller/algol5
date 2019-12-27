import { AlgolTurn, AlgolGame } from "../../../../../types";
import { hydrateStepInTurn } from "../helpers";

/*
Used in .endTurn and .newBattleTurn
Prunes all links that don't lead to a possible turn/game end,
and follows all other links (unless performance data says
that there is no need)
*/
export function hydrateTurn(game: AlgolGame, turn: AlgolTurn): AlgolTurn {
  return hydrateStepInTurn(game, turn, "root");
}
