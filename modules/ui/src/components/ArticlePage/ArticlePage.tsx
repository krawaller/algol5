import React, { FunctionComponent } from "react";
import { PageActions } from "../../helpers";
import css from "./ArticlePage.cssProxy";
import { Markdown } from "../Markdown";
import { Page } from "../Page";
import { Breadcrumbs, Crumb } from "../Breadcrumbs";
import { ScrollBox } from "../ScrollBox";

type ArticlePageProps = {
  actions: PageActions;
  title: string;
  category: string;
  html: string;
};

export const ArticlePage: FunctionComponent<ArticlePageProps> = props => {
  const { actions, html, title, category } = props;
  const crumbs: Crumb[] = [{ content: category }, { content: title }];
  const body = (
    <ScrollBox>
      <h3 className={css.articlePageTitle}>{title}</h3>
      <Markdown actions={actions} html={html} />
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
