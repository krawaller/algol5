import React from "react";
import { storiesOf } from "@storybook/react";

import { List } from ".";

storiesOf("List", module).add("List of games", () => {
  return <List callback={() => {}} />;
});
