import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";
import tagArticles from "../../../../payloads/dist/articles/tags";

const articleIds = tagArticles.map(item => item.id);

import { PayloadArticlePage } from ".";

storiesOf("PayloadArticlePage", module).add(
  "A common PayloadArticlePage component",
  () => {
    const newsId = select("Tag item", articleIds, articleIds[0]);
    const article = tagArticles.find(item => item.id === newsId)!;
    return (
      <div style={{ padding: 10 }}>
        <PayloadArticlePage article={article} />
      </div>
    );
  }
);
