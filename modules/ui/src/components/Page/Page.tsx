import React, { FunctionComponent, ReactNode, useEffect } from "react";

import css from "./Page.cssProxy";
import { AlgolError, isAlgolError } from "../../../../types";

type PageProps = {
  top: ReactNode;
  strip: ReactNode;
  body: ReactNode;
  error?: AlgolError;
};

const shown = new WeakSet<AlgolError>();

export const Page: FunctionComponent<PageProps> = props => {
  const { top, strip, body, error } = props;
  useEffect(() => {
    if (error && !shown.has(error)) {
      shown.add(error);
      // TODO - show error nicer, send it somewhere?
      alert(
        (isAlgolError(error) && error.message) || "Something went wrong! :/"
      );
    }
  }, [error]);
  return (
    <div className={css.pageContainer}>
      <div className={css.pageTop}>{top}</div>
      <div className={css.pageStrip}>{strip}</div>
      <div className={css.pageBody}>{body}</div>
    </div>
  );
};
