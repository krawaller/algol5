import React, { FunctionComponent, useMemo } from "react";

import { newsList } from "../../../../content/dist/newsList";
import { ArticleList } from "../ArticleList";
import { PageActions } from "../../helpers";
import { Page } from "../Page";
import { Crumb, Breadcrumbs } from "../Breadcrumbs";
import { ScrollBox } from "../ScrollBox";
import { usePrefetchList } from "../../helpers/usePrefetchList";

type NewsListPageProps = {
  actions: PageActions;
};

const newsUrls = newsList.map(item => `/news/${item.slug}`);

export const NewsListPage: FunctionComponent<NewsListPageProps> = props => {
  const { actions } = props;
  usePrefetchList(actions, newsUrls);
  const newsActions = useMemo(
    () => ({
      ...actions,
      goToArticle: (id: string) => {
        const listing = newsList.find(item => item.id === id);
        actions.navTo(`/news/${listing!.slug}`);
      },
    }),
    [actions]
  );
  const crumbs: Crumb[] = [{ content: "News" }];
  return (
    <Page
      top={null}
      strip={<Breadcrumbs crumbs={crumbs} actions={actions} />}
      body={
        <ScrollBox>
          <ArticleList actions={newsActions} list={newsList} />
        </ScrollBox>
      }
    />
  );
};
