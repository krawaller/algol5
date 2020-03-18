import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";

import { ButtonGroup } from ".";
import { Button } from "../Button/Button";

storiesOf("ButtonGroup", module).add("A common ButtonGroup component", () => {
  const merged = boolean("Merged", false);
  return (
    <div style={{ padding: 10 }}>
      <ButtonGroup merged={merged}>
        <Button>Hello</Button>
        <Button disabled="no party today">party</Button>
        <Button>people</Button>
        <Button>OMG!</Button>
      </ButtonGroup>
    </div>
  );
});
