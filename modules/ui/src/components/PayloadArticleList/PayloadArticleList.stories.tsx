import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { PayloadArticleList, PayloadArticleListActions } from ".";

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

storiesOf("PayloadArticleList", module).add(
  "A common PayloadArticleList component",
  () => {
    const actions: PayloadArticleListActions = {
      prefetch: (str: string) => console.log("Prefetched", str),
      navTo: (url: string) => console.log("Go to article", url),
    };
    const title = select(
      "List",
      Object.keys(lists),
      Object.keys(lists)[0]
    ) as keyof typeof lists;
    const list = lists[title];
    return (
      <div style={{ padding: 10 }}>
        <PayloadArticleList actions={actions} list={list} />
      </div>
    );
  }
);
