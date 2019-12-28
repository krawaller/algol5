import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Board } from ".";
import { GameId, list } from "../../../../games/dist/list";
import { AlgolUnitState } from "../../../../types";
import dataURIs from "../../../../graphics/dist/svgDataURIs";

storiesOf("Board", module)
  .add("Game board gallery", () => {
    const gameId = select("Game", list, list[0]) as GameId;
    return (
      <div>
        <p>Board for {gameId}:</p>
        <Board
          graphics={dataURIs[gameId]}
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
          icon: "knight",
          group: "whatev",
          owner: 1,
        },
        unit2: {
          id: "unit2",
          pos: "c4",
          group: "whatev",
          icon: "pawn",
          owner: 2,
        },
      };

    return (
      <Board
        graphics={dataURIs.murusgallicus}
        marks={marks}
        potentialMarks={potentialMarks}
        units={units}
        callback={pos => console.log("CLICKED", pos)}
      />
    );
  });
