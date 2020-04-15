import React from "react";
import { storiesOf } from "@storybook/react";
import article from "../../../../payloads/dist/articles/tags/irreversible";

import { PayloadArticle, PayloadArticleActions } from ".";

storiesOf("PayloadArticle", module).add(
  "A common PayloadArticle component",
  () => {
    const actions: PayloadArticleActions = {
      prefetch: (str: string) => console.log("Prefetched", str),
      navTo: (url: string) => console.log("Go to article", url),
    };

    return (
      <div style={{ padding: 10 }}>
        <PayloadArticle actions={actions} article={article} />
      </div>
    );
  }
);
