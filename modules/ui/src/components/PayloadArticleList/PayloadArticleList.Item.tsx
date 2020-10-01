import React, { Fragment, FunctionComponent, useCallback } from "react";
import css from "./PayloadArticleList.cssProxy";
import { Link } from "../Link";
import { AlgolListing, AppActions } from "../../../../types";

type PayloadArticleListItemProps = {
  actions: AppActions;
  listing: AlgolListing;
  compositeName: string;
};

export const PayloadArticleListItem: FunctionComponent<PayloadArticleListItemProps> = props => {
  const { actions, listing, compositeName } = props;
  const {
    title,
    composite: { x, y, ratio },
    blurb,
    url,
  } = listing;
  const handleClick = useCallback(() => actions.navTo(url), [actions.navTo]);
  return (
    <Link url={url} actions={actions} styleMode="none">
      <div className={css.payloadArticleListItem} onClick={handleClick}>
        <div>
          <div
            style={{
              backgroundImage: `url(/images/composites/${compositeName})`,
              backgroundPositionX: -x,
              backgroundPositionY: -y,
              height: 80 * ratio,
            }}
          />
        </div>
        <div className={css.payloadArticleListInfoBox}>
          <h4 className={css.payloadArticleListInfoTitle}>{title}</h4>
          {blurb.split("\n").map((t, n) => (
            <Fragment key={n}>
              {t}
              <br />
            </Fragment>
          ))}
        </div>
      </div>
    </Link>
  );
};
