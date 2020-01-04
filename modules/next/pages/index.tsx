import React from "react";

import { pageActions } from "../helpers";
import { TitlePage } from "../../ui/src/components/TitlePage";

const IndexPage = () => {
  return <TitlePage actions={pageActions} />;
};

export default IndexPage;
