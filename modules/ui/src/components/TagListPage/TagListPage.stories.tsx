import React from "react";
import { storiesOf } from "@storybook/react";

import { TagListPage } from ".";

storiesOf("TagListPage", module).add("A common TagListPage component", () => {
  return (
    <div style={{ padding: 10 }}>
      <TagListPage
        actions={{
          navTo: str => console.log("nav to", str),
          prefetch: str => console.log("prefetch", str),
        }}
      />
    </div>
  );
});
