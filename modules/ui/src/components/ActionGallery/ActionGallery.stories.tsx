import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";
import { ActionGallery } from ".";

storiesOf("ActionGallery", module).add(
  "A common ActionGallery component",
  () => {
    const active = boolean("Active", false);
    return (
      <div style={{ padding: 10 }}>
        <ActionGallery active={active} />
      </div>
    );
  }
);
