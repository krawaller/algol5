import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Navbar } from ".";
import { AlgolNav, fakeAppActions } from "../../helpers";

const btn = (str: string) => ({
  title: str,
  onClick: () => console.log("Clicked", str),
  desc: str,
});

const scenarios: Record<string, AlgolNav> = {
  A: {
    key: "A",
    links: [btn("Foo"), btn("Bar")],
    crumbs: [btn("1"), btn("2")],
  },
  B: {
    key: "B",
    links: [btn("Baz"), btn("Bin"), btn("Boo")],
    crumbs: [btn("1"), btn("2"), btn("3")],
  },
};
const list = Object.keys(scenarios);

storiesOf("Navbar", module).add("A common Navbar component", () => {
  const key = select("Scenario", list, list[0]);
  const scenario = scenarios[key];
  return (
    <div style={{ width: 500, height: 400, position: "relative" }}>
      <Navbar nav={scenario} actions={fakeAppActions} />
    </div>
  );
});
