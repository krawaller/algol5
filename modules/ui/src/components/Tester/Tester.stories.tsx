import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Tester } from ".";
import { GameId, list } from "../../../../games/dist/list";
import games from "../../../../logic/dist";
import meta from "../../../../games/dist/meta";

import dataURIs from "../../../../graphics/dist/svgDataURIs";
import { makeStaticGameAPI } from "../../../../battle/src";

storiesOf("Tester", module).add("Test games", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const api = makeStaticGameAPI(games[gameId]);
  const graphics = dataURIs[gameId];
  return (
    <Tester key={gameId} api={api} graphics={graphics} meta={meta[gameId]} />
  );
});
