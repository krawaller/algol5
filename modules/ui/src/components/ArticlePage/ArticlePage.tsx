import React, { FunctionComponent } from "react";
import { PageActions } from "../../helpers";
import { AlgolArticleData } from "../../../../types";
import css from "./ArticlePage.cssProxy";
import { Markdown } from "../Markdown";
import { Page } from "../Page";
import { Breadcrumbs, Crumb } from "../Breadcrumbs";

type ArticlePageProps = {
  actions: PageActions;
  data: AlgolArticleData;
  category: string;
  html: string;
};

export const ArticlePage: FunctionComponent<ArticlePageProps> = props => {
  const { actions, html, data, category } = props;
  const crumbs: Crumb[] = [{ content: category }, { content: data.title }];
  return (
    <Page
      top={null}
      strip={<Breadcrumbs crumbs={crumbs} actions={actions} />}
      body={<Markdown actions={actions} html={html} />}
    />
  );
};
