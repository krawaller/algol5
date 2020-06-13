import React from "react";
import { AlgolPage } from "../../../../types";
import { Page } from "../Page";
import { Markdown } from "../Markdown";
import { chunk } from "../../../../content/dist/chunks/404/chunk";
import { info } from "../../../../content/dist/chunks/404/info";
import { fourOhFourNav } from "../../../../common/nav/fourOhFourNav";

export const FourOhFourPage: AlgolPage = props => {
  const { actions } = props;
  return (
    <Page
      title="404"
      top={null}
      body={<Markdown html={chunk} actions={actions} />}
    />
  );
};

FourOhFourPage.mainImage = info.mainImage;
FourOhFourPage.domain = "404";
FourOhFourPage.metaDesc = "Lost in the woods";
FourOhFourPage.metaTitle = "404";
FourOhFourPage.nav = fourOhFourNav;
