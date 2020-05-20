
import React from "react";
import { storiesOf } from "@storybook/react";

import { Shell, ShellActions } from ".";

storiesOf("Shell", module).add("A common Shell component", () => {
  const actions: ShellActions = {
    foo: () => console.log('Executed foo')
  };
  return (
    <div style={{ padding: 10 }}>
      <Shell actions={actions} />
    </div>
  );
});
