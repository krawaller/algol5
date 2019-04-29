import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Icon } from "./Icon";
import { AlgolIcon, icons } from "../../types";

storiesOf("Icon", module).add("basic usage", () => (
  <div style={{ width: "100px", height: "100px" }}>
    <Icon
      owner={select("Owner", [0, 1, 2], 1)}
      icon={select("Icon", icons, "pawn") as AlgolIcon}
      mode={
        select("Mode", ["normal", "available", "selected"], "normal") as
          | "normal"
          | "available"
          | "selected"
      }
    />
  </div>
));
