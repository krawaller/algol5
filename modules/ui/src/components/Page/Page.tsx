import React, { FunctionComponent, ReactNode } from "react";

import css from "./Page.cssProxy";

type PageProps = {
  top: ReactNode;
  strip: ReactNode;
  body: ReactNode;
};

export const Page: FunctionComponent<PageProps> = props => {
  const { top, strip, body } = props;
  return (
    <div className={css.pageContainer}>
      <div className={css.pageTop}>{top}</div>
      <div className={css.pageStrip}>{strip}</div>
      <div className={css.pageBody}>{body}</div>
    </div>
  );
};
