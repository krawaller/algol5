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
  html: string;
};

export const ArticlePage: FunctionComponent<ArticlePageProps> = props => {
  const { actions, html, title } = props;
  const crumbs: Crumb[] = [
    // TODO - generalize?
    { content: "News", onClick: () => actions.navTo("/news") },
    { content: title },
  ];
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
