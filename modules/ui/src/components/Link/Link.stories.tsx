import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Link } from ".";
import { fakeAppActions } from "../../../../types";

storiesOf("Link", module).add("A common Link component", () => {
  const styleMode = select("Style", ["asButton", "link", "none"], "link");
  return (
    <div style={{ padding: 10 }}>
      <Link actions={fakeAppActions} url="/some/url" styleMode={styleMode} />
    </div>
  );
});
