import React, { FunctionComponent, useEffect, useMemo } from "react";
import css from "./PayloadArticleList.cssProxy";
import { PayloadArticleListItem } from "./PayloadArticleList.Item";
import { AlgolListing } from "../../../../types";

export interface PayloadArticleListActions {
  prefetch: (str: string) => void;
  navTo: (id: string) => void;
}

export type PayloadArticleListProps = {
  actions: PayloadArticleListActions;
  reverse?: boolean;
  list: AlgolListing[];
};

export const PayloadArticleList: FunctionComponent<PayloadArticleListProps> = props => {
  let { actions, list, reverse } = props;
  const listToRender = useMemo(() => {
    const ret = list.slice().sort((i1, i2) => (i1.sort < i2.sort ? -1 : 1));
    if (reverse) ret.reverse();
    return ret;
  }, [list]);
  return (
    <div className={css.payloadArticleList}>
      {listToRender.map(listing => (
        <PayloadArticleListItem
          key={listing.url}
          actions={actions}
          listing={listing}
        />
      ))}
    </div>
  );
};
