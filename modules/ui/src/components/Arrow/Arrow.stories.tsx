import React from "react";
import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs";

import { Arrow, arrowLayouts, arrowHeads, arrowFlush } from ".";
import { ArrowMulti } from "./Arrow.Multi";

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

storiesOf("Arrow", module).add("Multi Arrow", () => {
  const southeast = boolean("southeast", true);
  const southwest = boolean("southwest", true);
  const northeast = boolean("northeast", true);
  const northwest = boolean("northwest", true);
  const eastwest = boolean("eastwest", true);
  const northsouth = boolean("northsouth", true);
  const head = select("Head", arrowHeads, arrowHeads[0]);
  const flush = select("Flush", arrowFlush, arrowFlush[0]);
  return (
    <div style={{ padding: 0, width: 50, height: 50 }}>
      <ArrowMulti
        southeast={southeast}
        southwest={southwest}
        northeast={northeast}
        northwest={northwest}
        eastwest={eastwest}
        northsouth={northsouth}
        head={head}
        flush={flush}
      />
    </div>
  );
});
