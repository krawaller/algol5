import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";
import { newsList } from "../../../../content/dist/newsList";
import { allNews } from "../../../../content/dist/allNews";

const newsIds = newsList.map(item => item.id);

import { ArticlePage } from ".";

storiesOf("ArticlePage", module).add("A common ArticlePage component", () => {
  const newsId = select("News item", newsIds, newsIds[0]);
  const data = newsList.find(item => item.id === newsId)!;
  const html = allNews[newsId as keyof typeof allNews];
  const actions = {
    navTo: (url: string) => console.log("Nav to", url),
    prefetch: (url: string) => console.log("Prefetch", url),
  };
  return (
    <div style={{ padding: 10 }}>
      <ArticlePage category="News" actions={actions} data={data} html={html} />
    </div>
  );
});
