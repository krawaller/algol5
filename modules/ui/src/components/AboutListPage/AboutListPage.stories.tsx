import React from "react";
import { storiesOf } from "@storybook/react";

import { AboutListPage } from ".";

storiesOf("AboutListPage", module).add(
  "A common AboutListPage component",
  () => {
    return (
      <div style={{ padding: 10 }}>
        <AboutListPage
          actions={{
            navTo: str => console.log("nav to", str),
            prefetch: str => console.log("prefetch", str),
          }}
        />
      </div>
    );
  }
);
