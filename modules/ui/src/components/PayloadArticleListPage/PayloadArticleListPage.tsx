import React, { FunctionComponent } from "react";
import { PageActions } from "../../helpers";
import css from "./PayloadArticleListPage.cssProxy";
import { Page } from "../Page";
import { Breadcrumbs, Crumb } from "../Breadcrumbs";
import { ScrollBox } from "../ScrollBox";
import { AlgolListing } from "../../../../types";
import { PayloadArticleList } from "../PayloadArticleList";

type PayloadArticleListPageProps = {
  actions: PageActions;
  list: AlgolListing[];
  crumbs: Crumb[];
  reverse?: boolean;
  title: string;
};

export const PayloadArticleListPage: FunctionComponent<PayloadArticleListPageProps> = props => {
  const { actions, list, crumbs, reverse, title } = props;
  const body = (
    <ScrollBox>
      <h3 className={css.payloadArticleListPageTitle}>{title}</h3>
      <PayloadArticleList actions={actions} list={list} reverse={reverse} />
    </ScrollBox>
  );
  return (
    <Page
      top={null}
      strip={<Breadcrumbs crumbs={crumbs} actions={actions} />}
      body={body}
    />
  );
};
