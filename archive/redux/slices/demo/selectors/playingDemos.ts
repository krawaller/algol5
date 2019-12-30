import { WithAlgolDemoState, AlgolGameDemoState } from "../types";
import { createSelector } from "reselect";

export const playingDemos = createSelector(
  (state: WithAlgolDemoState) => state.demo.demos,
  (demos: WithAlgolDemoState["demo"]["demos"]) =>
    Object.keys(demos).filter(gameId => {
      const gameDemoState = demos[gameId as keyof typeof demos];
      return gameDemoState && gameDemoState.playing;
    }).length
);
