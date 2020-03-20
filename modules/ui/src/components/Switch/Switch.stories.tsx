import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";

import { Switch } from ".";

storiesOf("Switch", module).add("A common Switch component", () => {
  const onFlip = () => console.log("FLIP!");
  const flipped = boolean("Flipped", false);
  return (
    <div style={{ padding: 10 }}>
      <Switch onFlip={onFlip} text="switch" flipped={flipped} />
    </div>
  );
});
