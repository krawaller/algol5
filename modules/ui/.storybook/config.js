import { configure, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import "../dist/styles.css";

function loadStories() {
  const req = require.context("../src", true, /\.stories\.tsx$/);
  addDecorator(withKnobs);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
