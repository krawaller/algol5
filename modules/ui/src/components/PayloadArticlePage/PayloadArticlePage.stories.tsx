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
    const actions = {
      navTo: (url: string) => console.log("Nav to", url),
      prefetch: (url: string) => console.log("Prefetch", url),
    };
    const crumbs = [
      { content: "Tags", url: "/tags" },
      { content: article.title },
    ];
    return (
      <div style={{ padding: 10 }}>
        <PayloadArticlePage
          crumbs={crumbs}
          actions={actions}
          article={article}
        />
      </div>
    );
  }
);
