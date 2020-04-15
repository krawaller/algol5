import React, { FunctionComponent, useCallback } from "react";
import css from "./PayloadArticleList.cssProxy";
import { Link } from "../Link";

export interface PayloadArticleListItemActions {
  navTo: (url: string) => void;
  prefetch: (url: string) => void;
}

type PayloadArticleListItemProps = {
  actions: PayloadArticleListItemActions;
  url: string;
  item: {
    id: string;
    title: string;
    thumbdata: string;
    blurb: string;
  };
};

export const PayloadArticleListItem: FunctionComponent<PayloadArticleListItemProps> = props => {
  const { actions, item, url } = props;
  const { id, title, thumbdata, blurb } = item;
  const handleClick = useCallback(() => actions.navTo(url), [
    id,
    actions.navTo,
  ]);
  return (
    <Link url={url} actions={actions} styleMode="none">
      <div
        className={css.payloadArticleListItem}
        key={id}
        onClick={handleClick}
      >
        <div>
          <img src={thumbdata} />
        </div>
        <div className={css.payloadArticleListInfoBox}>
          <h4 className={css.payloadArticleListInfoTitle}>{title}</h4>
          {blurb}
        </div>
      </div>
    </Link>
  );
};
