import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";

import { Input } from ".";

storiesOf("Input", module).add("basic usage", () => {
  const autoSelect = boolean("Autoselect", false);
  return (
    <div style={{ margin: 10 }}>
      <Input
        autoSelect={autoSelect}
        value="poop"
        onChange={e => console.log(e)}
        onEnter={() => console.log("Pressed enter!")}
      />
    </div>
  );
});
