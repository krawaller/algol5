
import React from "react";
import { storiesOf } from "@storybook/react";

import { NewRemoteSession, NewRemoteSessionActions } from ".";

storiesOf("NewRemoteSession", module).add("A common NewRemoteSession component", () => {
  const actions: NewRemoteSessionActions = {
    foo: () => console.log('Executed foo')
  };
  return (
    <div style={{ padding: 10 }}>
      <NewRemoteSession actions={actions} />
    </div>
  );
});
