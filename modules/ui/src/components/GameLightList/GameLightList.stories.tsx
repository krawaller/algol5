import React from "react";
import { storiesOf } from "@storybook/react";

import { GameLightList } from ".";
import { PageActions } from "../../helpers";

storiesOf("GameLightList", module).add(
  "A common GameLightList component",
  () => {
    const actions: PageActions = {
      navTo: (url: string) => console.log("Nav to", url),
      prefetch: (url: string) => console.log("prefetched", url),
    };
    return (
      <div style={{ padding: 10 }}>
        <GameLightList actions={actions} />
      </div>
    );
  }
);
