import React, { FunctionComponent, ReactNode, useMemo, Fragment } from "react";
import classNames from "classnames";
import css from "./Breadcrumbs.cssProxy";

const noop = () => {};

type Crumb = {
  content: ReactNode;
  onClick?: () => void;
};

interface BreadcrumbsActions {
  navTo: (path: string) => void;
}

type BreadcrumbsProps = {
  crumbs: Crumb[];
  actions: BreadcrumbsActions;
};

export const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = props => {
  const { crumbs, actions } = props;
  const homeCrumb = useMemo(
    (): Crumb => ({
      content: "Home",
      onClick: () => actions.navTo("/"),
    }),
    []
  );
  return (
    <div className={css.breadcrumbsContainer}>
      {[homeCrumb].concat(crumbs).map((crumb, n) => (
        <Fragment key={n}>
          {n > 0 && <span className={css.breadcrumbDivider}>&gt;</span>}
          <span
            className={classNames(
              css.breadcrumb,
              crumb.onClick && css.breadcrumbClickable
            )}
            onClick={crumb.onClick || noop}
          >
            {crumb.content}
          </span>
        </Fragment>
      ))}
    </div>
  );
};
