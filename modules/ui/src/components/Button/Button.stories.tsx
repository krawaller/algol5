import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";

import { Button } from ".";

storiesOf("Button", module).add("A common Button component", () => {
  const disabled = boolean("Disabled", false);
  const big = boolean("Big", false);
  return (
    <div style={{ padding: 10 }}>
      <Button
        disabled={disabled}
        big={big}
        onClick={() => console.log("CLICK")}
      >
        Click me!
      </Button>
    </div>
  );
});
