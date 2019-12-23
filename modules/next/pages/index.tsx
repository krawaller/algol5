import React from "react";

import Link from "next/link";

import { List, ListItemWrapper } from "../../ui/src/List";

const Wrapper: ListItemWrapper = ({ gameId, children }) => (
  <Link href={"/games/" + gameId}>
    <a>{children}</a>
  </Link>
);

const GameList = () => {
  return <List itemWrapper={Wrapper} />;
};

export default GameList;
