import React, { FunctionComponent } from "react";
import Head from "next/head";

type MasterProps = {
  title?: string;
};

export const Master: FunctionComponent<MasterProps> = ({ title, children }) => {
  return (
    <div className="master">
      <Head>
        <title>{title}</title>
      </Head>
      <h2>Chessicals!</h2>
      <hr />

      <div className="page-content">{children}</div>
    </div>
  );
};

export default Master;
