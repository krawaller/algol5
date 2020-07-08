import React from "react";
import { storiesOf } from "@storybook/react";

import { Box } from ".";

storiesOf("Box", module).add("A common Box component", () => {
  return (
    <div style={{ padding: 10 }}>
      <Box title="Hello">Stuff in a box!</Box>
    </div>
  );
});
