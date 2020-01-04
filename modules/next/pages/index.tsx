import React from "react";

import Link from "next/link";

import { TitlePage, ItemWrapper } from "../../ui/src/components/TitlePage";

const Wrapper: ItemWrapper = ({ gameId, children }) => (
  <Link href={"/games/" + gameId}>
    <a>{children}</a>
  </Link>
);

const IndexPage = () => {
  return <TitlePage itemWrapper={Wrapper} />;
};

export default IndexPage;
