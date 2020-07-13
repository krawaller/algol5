import React from "react";
import { storiesOf } from "@storybook/react";

import { RadioSelector } from ".";

storiesOf("RadioSelector", module).add(
  "A common RadioSelector component",
  () => {
    return (
      <div style={{ padding: 10 }}>
        <RadioSelector
          group="gnurps"
          onSelect={v => console.log("SELECTED", v)}
          value="flarp"
          options={[
            { desc: "Flarp", value: "flarp" },
            { desc: "Gnarp", value: "gnarp" },
          ]}
        />
      </div>
    );
  }
);
