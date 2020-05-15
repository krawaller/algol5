import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Navbar, NavbarProps } from ".";

const btn = (str: string) => ({
  text: str,
  onClick: () => console.log("Clicked", str),
});

const scenarios: Record<string, NavbarProps> = {
  A: {
    buttons: [btn("Foo"), btn("Bar")],
    crumbs: [btn("1"), btn("2")],
  },
  B: {
    buttons: [btn("Baz"), btn("Bin"), btn("Boo")],
    crumbs: [btn("1"), btn("2"), btn("3")],
  },
};
const list = Object.keys(scenarios);

storiesOf("Navbar", module).add("A common Navbar component", () => {
  const key = select("Scenario", list, list[0]);
  const scenario = scenarios[key];
  return (
    <div style={{ width: 500, height: 400, position: "relative" }}>
      <Navbar {...scenario} />
    </div>
  );
});
