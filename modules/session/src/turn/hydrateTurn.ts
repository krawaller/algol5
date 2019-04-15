import { AlgolTurn, AlgolGame } from "../../../types";
import { hydrateStepInTurn } from "./hydrateStepInTurn";

// just needs to hydrate the root step
export function hydrateTurn(game: AlgolGame, turn: AlgolTurn): AlgolTurn {
  return hydrateStepInTurn(game, turn, "root");
}
