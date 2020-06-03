import React from "react";

import { AlgolPage } from "../../ui/src/helpers/AlgolPage";
import { TitlePage } from "../../ui/src/components/TitlePage";
import { homeNav } from "../../common/nav/homeNav";

const IndexPage: AlgolPage = props => {
  return <TitlePage actions={props.actions} />;
};

IndexPage.title = "Chessicals";
IndexPage.nav = homeNav;
IndexPage.mainImage = "/images/title.png";

export default IndexPage;
