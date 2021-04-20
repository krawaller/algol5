import React from "react";
import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs";

import { GameLanding } from ".";
import { GameId, list } from "../../../../games/dist/list";
import meta from "../../../../games/dist/meta";
import dataURIs from "../../../../graphics/dist/svgDataURIs";
import { AlgolVariantAnon } from "../../../../types";

storiesOf("GameLanding", module).add("init game", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const hasPrevious = boolean("Previous battle", false);
  const variants: AlgolVariantAnon[] = [
    {
      board: "regular",
      code: "x",
      desc: "regular",
      ruleset: "regular",
      setup: "regular",
    },
  ];
  return (
    <GameLanding
      key={gameId}
      meta={meta[gameId]}
      graphics={dataURIs[gameId]}
      previousSessionId={hasPrevious ? "somePreviousId" : undefined}
      variants={variants}
    />
  );
});
