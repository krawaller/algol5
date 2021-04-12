import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";
import news from "../../../../payloads/dist/listings/news";
import tags from "../../../../payloads/dist/listings/tags";
import games from "../../../../payloads/dist/listings/games";
import about from "../../../../payloads/dist/listings/about";

const lists = {
  News: news,
  Tags: tags,
  Games: games,
  About: about,
};

import { PayloadArticleListPage } from ".";

storiesOf("PayloadArticleListPage", module).add(
  "A common PayloadArticleListPage component",
  () => {
    const title = select(
      "List",
      Object.keys(lists),
      Object.keys(lists)[0]
    ) as keyof typeof lists;
    const list = lists[title];
    return (
      <div style={{ padding: 10 }}>
        <PayloadArticleListPage list={list} title={title} />
      </div>
    );
  }
);
