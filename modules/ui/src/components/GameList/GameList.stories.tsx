import React from "react";
import { storiesOf } from "@storybook/react";

import { GameList } from ".";

storiesOf("GameList", module).add("List of games", () => {
  return (
    <GameList
      callback={gameId => {
        console.log("Clicked game", gameId);
      }}
    />
  );
});
