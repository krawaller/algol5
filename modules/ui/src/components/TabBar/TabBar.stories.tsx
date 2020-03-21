import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { TabBar } from ".";

storiesOf("TabBar", module).add("A common TabBar component", () => {
  const labels = {
    foo: "Foo",
    bar: "Bar",
    baz: "Baz",
  };
  const current = select("Current", Object.keys(labels), "foo");
  return (
    <div style={{ marginTop: 10, marginLeft: 10, height: 40 }}>
      <TabBar
        labels={labels}
        onTabClick={to => console.log(to)}
        current={current}
      />
    </div>
  );
});
