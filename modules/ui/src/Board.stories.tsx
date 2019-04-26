import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Board } from "./Board";
import { GameId, list } from "../../games/dist/list";
import { AlgolUnitState } from "../../types";

storiesOf("Board", module)
  .add("Game board gallery", () => {
    const gameId = select("Game", list, list[0]) as GameId;
    return (
      <div>
        <p>Board for {gameId}:</p>
        <Board
          gameId={gameId}
          marks={[]}
          potentialMarks={[]}
          units={{}}
          callback={() => {}}
        />
      </div>
    );
  })
  .add("With content", () => {
    const marks = ["b3"],
      potentialMarks = ["b4", "a4", "c4"],
      units: { [id: string]: AlgolUnitState } = {
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
      };

    return (
      <Board
        gameId="murusgallicus"
        marks={marks}
        potentialMarks={potentialMarks}
        units={units}
        callback={pos => console.log("CLICKED", pos)}
      />
    );
  });
