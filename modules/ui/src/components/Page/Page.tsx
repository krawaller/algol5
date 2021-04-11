import React, { FunctionComponent, ReactNode } from "react";
import css from "./Page.cssProxy";

type PageProps = {
  title: ReactNode;
  top: ReactNode;
  body: ReactNode;
};

export const Page: FunctionComponent<PageProps> = props => {
  const { top, body, title } = props;
  return (
    <div className={css.pageContainer}>
      <div className={css.pageStrip}>
        <span>{title}</span>
      </div>
      <div className={css.pageTop}>{top}</div>
      <div className={css.pageBody}>{body}</div>
    </div>
  );
};
