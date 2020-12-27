
import React from "react";
import { storiesOf } from "@storybook/react";

import { Flicker, FlickerActions } from ".";

storiesOf("Flicker", module).add("A common Flicker component", () => {
  const actions: FlickerActions = {
    foo: () => console.log('Executed foo')
  };
  return (
    <div style={{ padding: 10 }}>
      <Flicker actions={actions} />
    </div>
  );
});
