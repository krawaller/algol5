import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";

import { Mark } from "./Mark";

storiesOf("Mark", module).add("basic usage", () => (
  <div
    style={{
      width: "100px",
      height: "100px",
      backgroundColor: "brown",
      position: "relative",
    }}
  >
    <Mark
      height={1}
      width={1}
      potential={boolean("Potential", true)}
      pos={text("Pos", "a1")}
      callback={x => console.log("Mark callback", x)}
    />
  </div>
));
