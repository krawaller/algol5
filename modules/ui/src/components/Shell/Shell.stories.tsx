import React from "react";
import { storiesOf } from "@storybook/react";

import { Shell } from ".";
import { fakeAppActions } from "../../helpers";

storiesOf("Shell", module).add("A common Shell component", () => {
  return (
    <div style={{ padding: 10 }}>
      <Shell actions={fakeAppActions} />
    </div>
  );
});
