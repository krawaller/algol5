import React from "react";
import { storiesOf } from "@storybook/react";
import article from "../../../../payloads/dist/articles/tags/irreversible";

import { PayloadArticle } from ".";

storiesOf("PayloadArticle", module).add(
  "A common PayloadArticle component",
  () => {
    return (
      <div style={{ padding: 10 }}>
        <PayloadArticle article={article} />
      </div>
    );
  }
);
