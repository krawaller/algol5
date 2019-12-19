import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Tester } from ".";
import { GameId, list } from "../../../games/dist/list";
import games from "../../../logic/dist/";

import { makeStaticGameAPI } from "../../../battle/src";

storiesOf("Tester", module).add("Test games", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  return <Tester key={gameId} api={makeStaticGameAPI(games[gameId])} />;
});
