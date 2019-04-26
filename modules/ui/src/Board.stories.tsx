import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Board } from "./Board";
import { GameId, list } from "../../games/dist/list";

storiesOf("Board", module).add("basic usage", () => (
  <div style={{ width: "400px" }}>
    <Board gameId={select("Game", list, list[0]) as GameId} />
  </div>
));
