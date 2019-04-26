import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Board } from "./Board";
import { GameId, list } from "../../games/dist/list";
import { AlgolBoardState } from "../../types";

storiesOf("Board", module)
  .add("Game board gallery", () => {
    const gameId = select("Game", list, list[0]) as GameId;
    const emptyState: AlgolBoardState = {
      marks: [],
      potentialMarks: [],
      units: {}
    };
    return (
      <div>
        <p>Board for {gameId}:</p>
        <Board gameId={gameId} state={emptyState} callback={() => {}} />
      </div>
    );
  })
  .add("With content", () => {
    const boardState: AlgolBoardState = {
      marks: ["b3"],
      potentialMarks: ["b4", "a4", "c4"],
      units: {
        unit1: {
          id: "unit1",
          pos: "b3",
          group: "knight",
          owner: 1
        },
        unit2: {
          id: "unit2",
          pos: "d6",
          group: "pawn",
          owner: 2
        }
      }
    };
    return (
      <Board
        gameId="murusgallicus"
        state={boardState}
        callback={pos => console.log("CLICKED", pos)}
      />
    );
  });
