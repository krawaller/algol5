import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Nav } from ".";
import { AlgolNav, fakeAppActions } from "../../../../types";

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
    me: { title: "Step A", desc: "Full of A:s" },
  },
  B: {
    key: "B",
    links: [btn("Baz"), btn("Bin"), btn("Boo")],
    crumbs: [btn("1"), btn("2"), btn("3")],
    me: { title: "Step B", desc: "Full of B:s" },
  },
};
const list = Object.keys(scenarios);

storiesOf("Navbar", module).add("A common Navbar component", () => {
  const key = select("Scenario", list, list[0]);
  const scenario = scenarios[key];
  return (
    <div style={{ width: 500, height: 500, position: "relative" }}>
      <Nav nav={scenario} actions={fakeAppActions} />
    </div>
  );
});
