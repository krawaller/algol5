import React, { FunctionComponent, ReactNode, useEffect } from "react";

import css from "./Page.cssProxy";
import { AlgolError, AlgolErrorReport } from "../../../../types";

type PageProps = {
  top: ReactNode;
  strip: ReactNode;
  body: ReactNode;
  errorReport?: AlgolErrorReport;
};

const shown = new WeakSet<AlgolError>();

export const Page: FunctionComponent<PageProps> = props => {
  const { top, strip, body, errorReport } = props;
  useEffect(() => {
    if (
      errorReport &&
      errorReport.level !== "silent"
      // && !shown.has(errorReport.error) // TODO - we still want to show modal, but not resend error
    ) {
      shown.add(errorReport.error);
      // TODO - show error nicer, send it somewhere?
      alert(errorReport.error.description || "Something went wrong! :/");
    }
  }, [errorReport]);
  return (
    <div className={css.pageContainer}>
      <div className={css.pageTop}>{top}</div>
      <div className={css.pageStrip}>{strip}</div>
      <div className={css.pageBody}>{body}</div>
    </div>
  );
};
