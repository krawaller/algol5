import React, { FunctionComponent, useMemo, Fragment } from "react";
import css from "./Breadcrumbs.cssProxy";
import { Link } from "../Link";
import classNames from "classnames";

const noop = () => {};

export type Crumb = {
  content: string;
  url?: string;
  onClick?: () => void;
};

type BreadcrumbsProps = {
  crumbs: Crumb[];
};

export const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = props => {
  const { crumbs } = props;
  const homeCrumb = useMemo(
    (): Crumb => ({
      content: "Home",
      url: "/",
    }),
    []
  );
  return (
    <div className={css.breadcrumbsContainer}>
      {[homeCrumb].concat(crumbs).map((crumb, n) => (
        <Fragment key={n}>
          {n > 0 && <span className={css.breadcrumbDivider}>&gt;</span>}
          {crumb.url ? (
            <span
              className={classNames(css.breadcrumb, css.breadcrumbClickable)}
            >
              <Link text={crumb.content} url={crumb.url} />
            </span>
          ) : (
            <span
              className={classNames(
                css.breadcrumb,
                crumb.onClick && css.breadcrumbClickable
              )}
              onClick={crumb.onClick || noop}
            >
              {crumb.content}
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
};
