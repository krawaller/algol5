import { WithAlgolDemoState } from "../types";

export const playingDemos = (state: WithAlgolDemoState) =>
  Object.keys(state.demo.demos).filter(
    gameId => state.demo.demos[gameId].playing
  ).length;
