import React from "react";
import { storiesOf } from "@storybook/react";

import { ScrollBox } from ".";
import { Markdown } from "../Markdown";
import { rules } from "../../../../content/dist/games/amazons/rules";

storiesOf("ScrollBox", module).add("A common ScrollBox component", () => {
  return (
    <div
      style={{
        padding: 10,
        margin: 10,
        height: 300,
        width: 400,
        position: "relative",
        border: "1px solid black",
      }}
    >
      <ScrollBox>
        <Markdown actions={{ navTo: () => {} }} html={rules.html} />
      </ScrollBox>
    </div>
  );
});
