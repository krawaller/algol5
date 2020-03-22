import React from "react";
import { storiesOf } from "@storybook/react";

import { AspectRatioBox } from ".";

storiesOf("AspectRatioBox", module).add(
  "A common AspectRatioBox component",
  () => {
    return (
      <div style={{ padding: 10, minHeight: 400 }}>
        <AspectRatioBox height={9} width={16} strategy="byOrientation">
          <div style={{ backgroundColor: "green" }} />
        </AspectRatioBox>
        <span>Some content after aspect ratio box</span>
      </div>
    );
  }
);
