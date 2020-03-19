import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, select } from "@storybook/addon-knobs";

import { Button } from ".";

const intents = ["", "primary"] as const;

storiesOf("Button", module).add("A common Button component", () => {
  const disabled = boolean("Disabled", false);
  const big = boolean("Big", false);
  const active = boolean("Active", false);
  const intent = select("Intent", intents, "primary");
  return (
    <div style={{ padding: 10 }}>
      <Button
        disabled={disabled}
        big={big}
        active={active}
        intent={intent}
        onClick={() => console.log("CLICK")}
      >
        Click me!
      </Button>
    </div>
  );
});
