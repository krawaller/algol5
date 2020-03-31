
import React from "react";
import { storiesOf } from "@storybook/react";

import { Link, LinkActions } from ".";

storiesOf("Link", module).add("A common Link component", () => {
  const actions: LinkActions = {
    foo: () => console.log('Executed foo')
  };
  return (
    <div style={{ padding: 10 }}>
      <Link actions={actions} />
    </div>
  );
});
