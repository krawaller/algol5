import { WithAlgolDemoState } from "../types";
import { createSelector } from "reselect";

export const playingDemos = createSelector(
  (state: WithAlgolDemoState) => state.demo.demos,
  (demos: WithAlgolDemoState["demo"]["demos"]) =>
    Object.keys(demos).filter(gameId => demos[gameId].playing).length
);
