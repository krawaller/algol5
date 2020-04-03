import React, { FunctionComponent, useMemo } from "react";

import { aboutList } from "../../../../content/dist/aboutList";
import { ArticleList } from "../ArticleList";
import { PageActions } from "../../helpers";
import { Page } from "../Page";
import { Crumb, Breadcrumbs } from "../Breadcrumbs";
import { ScrollBox } from "../ScrollBox";

type AboutListPageProps = {
  actions: PageActions;
};

export const AboutListPage: FunctionComponent<AboutListPageProps> = props => {
  const { actions } = props;
  const crumbs: Crumb[] = [{ content: "About" }];
  return (
    <Page
      top={null}
      strip={<Breadcrumbs crumbs={crumbs} actions={actions} />}
      body={
        <ScrollBox>
          <ArticleList
            reverse
            actions={actions}
            list={aboutList}
            prefix="/about/"
          />
        </ScrollBox>
      }
    />
  );
};
