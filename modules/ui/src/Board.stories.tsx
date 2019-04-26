import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Board } from "./Board";
import { GameId, list } from "../../games/dist/list";
import { AlgolBoardState } from "../../types";

storiesOf("Board", module).add("Game board gallery", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const emptyState: AlgolBoardState = {
    marks: [],
    potentialMarks: [],
    units: {}
  };
  return (
    <div style={{ width: "400px" }}>
      <p>Board for {gameId}:</p>
      <Board gameId={gameId} state={emptyState} />
    </div>
  );
});
