import React from "react";

import Link from "next/link";

import { List, ListItemWrapper } from "../../ui/src/List";

const Wrapper: ListItemWrapper = ({ gameId, children }) => (
  <Link href={"/games/" + gameId}>
    <a>{children}</a>
  </Link>
);

const GameList = () => {
  return (
    <div>
      <h1>Chessicals</h1>
      <p>
        Welcome! This is rather bare bones still, but, click a game below to try
        it out!
      </p>
      <hr />
      <List itemWrapper={Wrapper} />
    </div>
  );
};

export default GameList;
