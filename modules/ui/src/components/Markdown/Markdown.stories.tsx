import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";
import { GameId, list } from "../../../../games/dist/list";

import { Markdown } from ".";

storiesOf("Markdown", module).add("Showing html for game rules/about", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const kind = select("Content", ["rules", "about"], "rules");
  const html = require(`../../../../content/dist/games/${gameId}/${kind}.ts`)[
    kind
  ].html;
  return (
    <div style={{ padding: 10, width: 500 }}>
      <Markdown html={html} />
    </div>
  );
});
