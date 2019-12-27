import { AlgolBattle, AlgolBattleSave } from "../../../../types";

export const makeBattleSave = (battle: AlgolBattle): AlgolBattleSave => ({
  player: battle.gameEndedBy ? battle.winner! : battle.player,
  turn: battle.gameEndedBy ? 0 : battle.turnNumber,
  path: battle.path,
});
