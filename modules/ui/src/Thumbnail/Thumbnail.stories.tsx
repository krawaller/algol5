import React from "react";
import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs";

import { Thumbnail } from ".";
import { GameId, list } from "../../../games/dist/list";

import demos from "../../../battle/dist/allDemos";
import dataURIs from "../../../graphics/dist/svgDataURIs";

storiesOf("Thumbnail", module).add("test game thumbnail", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const playing = boolean("Playing?", true);
  const demo = demos[gameId];
  return (
    <Thumbnail
      demo={demo}
      playing={playing}
      graphics={dataURIs[gameId]}
      gameId={gameId}
    />
  );
});
