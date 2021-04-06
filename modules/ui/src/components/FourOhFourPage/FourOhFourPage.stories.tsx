import React from "react";
import { storiesOf } from "@storybook/react";

import { FourOhFourPage } from ".";

storiesOf("FourOhFourPage", module).add(
  "A common FourOhFourPage component",
  () => {
    return (
      <div style={{ padding: 10 }}>
        <FourOhFourPage />
      </div>
    );
  }
);
