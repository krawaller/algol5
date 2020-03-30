import React from "react";
import { storiesOf } from "@storybook/react";

import { NewsListPage } from ".";

storiesOf("NewsListPage", module).add("A common NewsListPage component", () => {
  return (
    <div style={{ padding: 10 }}>
      <NewsListPage
        actions={{
          navTo: str => console.log("nav to", str),
          prefetch: str => console.log("prefetch", str),
        }}
      />
    </div>
  );
});
