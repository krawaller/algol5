import { GameId } from "../../../games/dist/list";

export const deleteSession = (gameId: GameId, sessionId: string) => {
  const activeKey = `Algol_${gameId}_active`;
  const finishedKey = `Algol_${gameId}_finished`;
  const activeList = JSON.parse(localStorage.getItem(activeKey) || "{}");
  const finishedList = JSON.parse(localStorage.getItem(finishedKey) || "{}");
  delete activeList[sessionId];
  delete finishedList[sessionId];

  localStorage.setItem(activeKey, JSON.stringify(activeList));
  localStorage.setItem(finishedKey, JSON.stringify(finishedList));
};
