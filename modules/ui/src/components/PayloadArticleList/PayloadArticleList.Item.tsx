import React, { Fragment, FunctionComponent, useCallback } from "react";
import { Link } from "../Link";
import { AlgolListing } from "../../../../types";
import { ListItem } from "../List";
import { useAppActions } from "../../contexts";

type PayloadArticleListItemProps = {
  listing: AlgolListing;
  compositeName: string;
};

export const PayloadArticleListItem: FunctionComponent<PayloadArticleListItemProps> = props => {
  const { listing, compositeName } = props;
  const {
    title,
    composite: { x, y, ratio },
    blurb,
    url,
  } = listing;
  const actions = useAppActions();
  const handleClick = useCallback(() => actions.navTo(url), [actions.navTo]);
  const pic = (
    <div
      style={{
        backgroundImage: `url(/images/composites/${compositeName})`,
        backgroundPositionX: -x,
        backgroundPositionY: -y,
        height: 80 * ratio,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
  const content = (
    <Fragment>
      {blurb.split("\n").map((t, n) => (
        <Fragment key={n}>
          {t}
          <br />
        </Fragment>
      ))}
    </Fragment>
  );
  return (
    <Link url={url} styleMode="none">
      <ListItem
        title={title}
        pic={pic}
        content={content}
        onClick={handleClick}
      />
    </Link>
  );
};
