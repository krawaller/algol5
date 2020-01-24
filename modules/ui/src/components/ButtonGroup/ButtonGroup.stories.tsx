import React from "react";
import { storiesOf } from "@storybook/react";

import { ButtonGroup } from ".";
import { Button } from "../Button/Button";

storiesOf("ButtonGroup", module).add("A common ButtonGroup component", () => {
  return (
    <div style={{ padding: 10 }}>
      <ButtonGroup>
        <Button big>Hello</Button>
        <Button disabled="no party today">party</Button>
        <Button>people!</Button>
      </ButtonGroup>
    </div>
  );
});
