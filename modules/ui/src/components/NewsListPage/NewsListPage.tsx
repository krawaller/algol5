import React, { FunctionComponent, useMemo } from "react";

import { newsList } from "../../../../content/dist/newsList";
import { ArticleList } from "../ArticleList";
import { PageActions } from "../../helpers";
import { Page } from "../Page";
import { Crumb, Breadcrumbs } from "../Breadcrumbs";
import { ScrollBox } from "../ScrollBox";

type NewsListPageProps = {
  actions: PageActions;
};

export const NewsListPage: FunctionComponent<NewsListPageProps> = props => {
  const { actions } = props;
  const crumbs: Crumb[] = [{ content: "News" }];
  return (
    <Page
      top={null}
      strip={<Breadcrumbs crumbs={crumbs} actions={actions} />}
      body={
        <ScrollBox>
          <ArticleList
            reverse
            actions={actions}
            list={newsList}
            prefix="/news/"
          />
        </ScrollBox>
      }
    />
  );
};
