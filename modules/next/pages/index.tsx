import React from "react";

import Link from "next/link";

import { GameList, ListItemWrapper } from "../../ui/src/components/GameList";

const Wrapper: ListItemWrapper = ({ gameId, children }) => (
  <Link href={"/games/" + gameId}>
    <a>{children}</a>
  </Link>
);

const TitlePage = () => {
  return (
    <div style={{ padding: 10 }}>
      <h1>Chessicals</h1>
      <p>
        Welcome! This is rather bare bones still, but, click a game below to try
        it out!
      </p>
      <hr />
      <GameList itemWrapper={Wrapper} />
    </div>
  );
};

export default TitlePage;
