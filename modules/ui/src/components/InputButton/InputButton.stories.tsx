import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";

import { InputButton } from ".";

storiesOf("InputButton", module).add("basic usage", () => {
  const buttonDisabled = boolean("Button disabled", false);
  const inputDisabled = boolean("Input disabled", false);
  return (
    <div style={{ margin: 10 }}>
      <InputButton
        value="poop"
        buttonDisabled={buttonDisabled}
        inputDisabled={inputDisabled}
        onChange={e => console.log("ONCHANGE", e)}
        onEnter={() => console.log("Pressed enter!")}
        onClick={() => console.log("Pressed button!")}
      >
        Gdunk
      </InputButton>
    </div>
  );
});
