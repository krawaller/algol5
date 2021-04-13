import React, { FunctionComponent } from "react";
import { Page } from "../Page";
import { ScrollBox } from "../ScrollBox";
import { AlgolListingContainer } from "../../../../types";
import { PayloadArticleList } from "../PayloadArticleList";

type PayloadArticleListPageProps = {
  list: AlgolListingContainer;
  reverse?: boolean;
  title: string;
};

export const PayloadArticleListPage: FunctionComponent<PayloadArticleListPageProps> = props => {
  const { list, reverse, title } = props;
  const body = (
    <ScrollBox>
      <PayloadArticleList list={list} reverse={reverse} />
    </ScrollBox>
  );
  return <Page title={title} top={null} body={body} />;
};
