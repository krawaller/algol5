import React from "react";
import { storiesOf } from "@storybook/react";

import { PayloadArticleList, PayloadArticleListActions } from ".";
import games from "../../../../payloads/dist/listings/games";

storiesOf("PayloadArticleList", module).add(
  "A common PayloadArticleList component",
  () => {
    const actions: PayloadArticleListActions = {
      prefetch: (str: string) => console.log("Prefetched", str),
      navTo: (url: string) => console.log("Go to article", url),
    };
    return (
      <div style={{ padding: 10 }}>
        <PayloadArticleList actions={actions} list={games} />
      </div>
    );
  }
);
