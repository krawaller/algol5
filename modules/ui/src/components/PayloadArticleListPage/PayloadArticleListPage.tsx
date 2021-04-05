import React, { FunctionComponent } from "react";
import { Page } from "../Page";
import { ScrollBox } from "../ScrollBox";
import { AlgolListingContainer } from "../../../../types";
import { PayloadArticleList } from "../PayloadArticleList";
import { AppActions } from "../../contexts";

type PayloadArticleListPageProps = {
  actions: AppActions;
  list: AlgolListingContainer;
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
