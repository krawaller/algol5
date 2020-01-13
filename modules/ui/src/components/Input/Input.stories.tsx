import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";

import { Input } from ".";

storiesOf("Input", module).add("basic usage", () => {
  const autoSelect = boolean("Autoselect", false);
  const disabled = boolean("disabled", false);
  const placeholder = text("placeholder", "Enter password");
  return (
    <div style={{ margin: 10 }}>
      <Input
        autoSelect={autoSelect}
        disabled={disabled}
        value=""
        placeholder={placeholder}
        onChange={e => console.log(e)}
        onEnter={() => console.log("Pressed enter!")}
      />
    </div>
  );
});
