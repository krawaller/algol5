import React, { FunctionComponent, useMemo } from "react";

import { tagList } from "../../../../content/dist/tagList";
import { ArticleList } from "../ArticleList";
import { PageActions } from "../../helpers";
import { Page } from "../Page";
import { Crumb, Breadcrumbs } from "../Breadcrumbs";
import { ScrollBox } from "../ScrollBox";

type TagListPageProps = {
  actions: PageActions;
};

export const TagListPage: FunctionComponent<TagListPageProps> = props => {
  const { actions } = props;
  const crumbs: Crumb[] = [{ content: "Tags" }];
  return (
    <Page
      top={null}
      strip={<Breadcrumbs crumbs={crumbs} actions={actions} />}
      body={
        <ScrollBox>
          <ArticleList
            reverse
            actions={actions}
            list={tagList}
            prefix="/tags/"
          />
        </ScrollBox>
      }
    />
  );
};
