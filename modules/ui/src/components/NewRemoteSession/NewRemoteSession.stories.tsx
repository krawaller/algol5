import React from "react";
import { storiesOf } from "@storybook/react";

import { NewRemoteSession } from ".";

storiesOf("NewRemoteSession", module).add(
  "A common NewRemoteSession component",
  () => {
    return (
      <div style={{ padding: 10 }}>
        <NewRemoteSession />
      </div>
    );
  }
);
