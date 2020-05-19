import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { GamePage } from ".";
import { GameId, list } from "../../../../games/dist/list";

import allGamePayloads from "../../../../payloads/dist/games";
import { fakePageActions, fakeBattleNavActions } from "../../helpers";

storiesOf("GamePage", module).add(
  "Used for individual game pages in the app",
  () => {
    const gameId = select("Game", list, list[0]) as GameId;
    const payload = allGamePayloads[gameId];
    return (
      <GamePage
        key={gameId}
        gamePayload={payload}
        actions={{
          ...fakePageActions,
          ...fakeBattleNavActions,
        }}
        ctxt={{ mode: "gamelobby", sessionId: null }}
      />
    );
  }
);
