import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Thumbnail } from ".";
import { GameId, list } from "../../../../games/dist/list";

import demos from "../../../../battle/dist/allDemos";
import dataURIs from "../../../../graphics/dist/svgDataURIs";

storiesOf("Thumbnail", module).add("test game thumbnail", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const demo = demos[gameId];
  return (
    <div>
      <div style={{ width: 150, height: 150 }}>
        <Thumbnail demo={demo} graphics={dataURIs[gameId]} gameId={gameId} />
      </div>
      <p
        style={{
          width: 150,
          padding: 5,
          height: 1000,
          backgroundColor: "beige",
        }}
      >
        Thumbnail should stop as soon as it is slightly out of bounds!
      </p>
    </div>
  );
});
