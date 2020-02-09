import React from "react";
import { storiesOf } from "@storybook/react";

import { ArticleList, ArticleListActions } from ".";
import { newsList } from "../../../../content/dist/newsList";

storiesOf("ArticleList", module).add("A common ArticleList component", () => {
  const actions: ArticleListActions = {
    foo: () => console.log("Executed foo"),
  };
  return (
    <div style={{ padding: 10 }}>
      <ArticleList actions={actions} list={newsList} />
    </div>
  );
});
