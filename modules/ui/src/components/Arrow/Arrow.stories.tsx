import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Arrow, arrowLayouts, arrowHeads, arrowFlush } from ".";

storiesOf("Arrow", module).add("A common Arrow component", () => {
  const layout = select("Layout", arrowLayouts, arrowLayouts[0]);
  const head = select("Head", arrowHeads, arrowHeads[0]);
  const flush = select("Flush", arrowFlush, arrowFlush[0]);
  return (
    <div style={{ padding: 0, width: 49, height: 49 }}>
      <Arrow layout={layout} head={head} flush={flush} />
    </div>
  );
});
