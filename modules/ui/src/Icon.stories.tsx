import React from "react";
import { storiesOf } from "@storybook/react";
import { number, select } from "@storybook/addon-knobs";

import { Icon } from "./Icon";

const icons = ["knight", "pawn", "rook", "king", "queen", "bishop"];

storiesOf("Icon", module).add("basic usage", () => (
  <div style={{ width: "100px", height: "100px" }}>
    <Icon
      owner={select("Owner", [0, 1, 2], 1)}
      icon={select("Icon", icons, "pawn")}
    />
  </div>
));
