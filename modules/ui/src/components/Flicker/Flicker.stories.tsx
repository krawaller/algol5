import React from "react";
import { storiesOf } from "@storybook/react";

import { Flicker } from ".";

storiesOf("Flicker", module).add("A common Flicker component", () => {
  return (
    <div style={{ padding: 10 }}>
      <Flicker
        onLeft={() => console.log("LEFT")}
        onRight={() => console.log("RIGHT")}
      />
    </div>
  );
});
