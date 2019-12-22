import React, { FunctionComponent } from "react";
import Head from "next/head";
import Link from "next/link";

type MasterProps = {
  title?: string;
};

export const Master: FunctionComponent<MasterProps> = ({ title, children }) => {
  return (
    <div className="master">
      <Head>
        <title>{title}</title>
      </Head>
      <h2>
        <Link href="/">
          <a>Chessicals!</a>
        </Link>
        {" " + title}
      </h2>
      <hr />

      <div className="page-content">{children}</div>
    </div>
  );
};

export default Master;
