import React, { useState } from "react";
import { configure, addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import "../dist/styles.css";

function loadStories() {
  const req = require.context("../src", true, /\.stories\.tsx$/);
  addDecorator(withKnobs);
  //addDecorator(withState);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

// https://levelup.gitconnected.com/adding-state-to-storybook-in-react-c6744fda25b4

function Stage({ children, ...props }) {
  const [state, setState] = useState({});
  return <div {...props}>{children(state, setState)}</div>;
}

function State({ state, ...props }) {
  return (
    <div {...props}>
      Parent state: <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

function withState(story) {
  return (
    <Stage>
      {(state, setState) => (
        <div style={{ display: "flex", flexFlow: "column" }}>
          {story(state, setState)}
          <hr />
          <State state={state} />
        </div>
      )}
    </Stage>
  );
}
