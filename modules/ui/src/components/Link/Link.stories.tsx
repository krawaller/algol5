import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Link } from ".";
import { AppActions } from "../../helpers";

storiesOf("Link", module).add("A common Link component", () => {
  const actions: AppActions = {
    prefetch: (url: string) => console.log("Prefetch", url),
    navTo: (url: string) => console.log("Nav to", url),
  };
  const styleMode = select("Style", ["asButton", "link", "none"], "link");
  return (
    <div style={{ padding: 10 }}>
      <Link actions={actions} url="/some/url" styleMode={styleMode} />
    </div>
  );
});
