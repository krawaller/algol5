import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs";

import { Stepper } from "./Stepper";

storiesOf("Stepper", module).add("basic usage", () => {
  const max = number("Max", 10);
  return (
    <Parent>
      {(state = max, setState = () => {}) => (
        <div style={{ width: "250px" }}>
          <Stepper
            current={Math.min(state, max)}
            max={max}
            onChange={setState}
          />
          <hr />
          Current value is {state} out of {max}
        </div>
      )}
    </Parent>
  );
});

function Parent({ children }: any) {
  const [state, setState] = useState();
  return <div>{children(state, setState)}</div>;
}
