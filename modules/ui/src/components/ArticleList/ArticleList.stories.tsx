import React from "react";
import { storiesOf } from "@storybook/react";

import { ArticleList, ArticleListActions } from ".";
import { newsList } from "../../../../content/dist/newsList";

storiesOf("ArticleList", module).add("A common ArticleList component", () => {
  const actions: ArticleListActions = {
    prefetch: (str: string) => console.log("Prefetched", str),
    goToArticle: (id: string) => console.log("Go to article", id),
  };
  return (
    <div style={{ padding: 10 }}>
      <ArticleList actions={actions} list={newsList} />
    </div>
  );
});
