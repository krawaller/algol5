import React, { Fragment, FunctionComponent, useMemo, useState } from "react";
import css from "./PayloadArticleList.cssProxy";
import { PayloadArticleListItem } from "./PayloadArticleList.Item";
import { AlgolListingContainer, AlgolListing } from "../../../../types";
import compositeId from "../../../../payloads/dist/compositeId";
import { ButtonGroup } from "../ButtonGroup";
import { ButtonBar } from "../ButtonBar";

export type PayloadArticleListProps = {
  reverse?: boolean;
  list: AlgolListingContainer;
};

const sort1 = (l1: AlgolListing, l2: AlgolListing) =>
  l1.sort < l2.sort ? -1 : 1;
const sort2 = (l1: AlgolListing, l2: AlgolListing) =>
  l1.sort2! < l2.sort2! ? -1 : 1;

export const PayloadArticleList: FunctionComponent<PayloadArticleListProps> = props => {
  const { list, reverse } = props;
  const { composite, listings, sorts } = list;
  const [sortIndex, setSortIndex] = useState(0);
  const listToRender = useMemo(() => {
    const ret = listings
      .slice()
      .filter(l => !l.hidden)
      .sort([sort1, sort2][sortIndex]);
    if (reverse) ret.reverse();
    return ret;
  }, [list, sortIndex, reverse]);
  return (
    <Fragment>
      {sorts && (
        <ButtonGroup noBottomMargin>
          <ButtonBar
            current={sortIndex}
            onChange={setSortIndex}
            texts={sorts}
          />
        </ButtonGroup>
      )}
      <div className={css.payloadArticleList}>
        {listToRender.map(listing => (
          <PayloadArticleListItem
            key={listing.url}
            listing={listing}
            compositeName={composite.replace(
              ".png",
              "_" + compositeId + ".png"
            )}
          />
        ))}
      </div>
    </Fragment>
  );
};
