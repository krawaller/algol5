import React, { FunctionComponent } from "react";
import css from "./PayloadArticleListPage.cssProxy";
import { Page } from "../Page";
import { ScrollBox } from "../ScrollBox";
import { AlgolListing, AppActions } from "../../../../types";
import { PayloadArticleList } from "../PayloadArticleList";

type PayloadArticleListPageProps = {
  actions: AppActions;
  list: AlgolListing[];
  reverse?: boolean;
  title: string;
};

export const PayloadArticleListPage: FunctionComponent<PayloadArticleListPageProps> = props => {
  const { actions, list, reverse, title } = props;
  const body = (
    <ScrollBox>
      <PayloadArticleList actions={actions} list={list} reverse={reverse} />
    </ScrollBox>
  );
  return <Page title={title} top={null} body={body} />;
};
