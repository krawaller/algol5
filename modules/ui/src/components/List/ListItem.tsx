import React from "react";
import classNames from "classnames";
import css from "./List.cssProxy";

type ListItemProps = {
  title?: string;
  content?: JSX.Element;
  pic?: JSX.Element;
  onClick?: () => void;
  actions?: JSX.Element;
};

export const ListItem = ({
  title,
  content,
  pic,
  actions,
  onClick,
}: ListItemProps) => {
  return (
    <div
      className={classNames(
        css.listItem,
        Boolean(onClick) && css.listItemClickable
      )}
      onClick={onClick}
    >
      <div className={css.listItemPic}>{pic}</div>
      <div className={css.listItemContent}>
        {title && <h4 className={css.listItemTitle}>{title}</h4>}
        {content}
      </div>
      {actions && <div className={css.listItemActions}>{actions}</div>}
    </div>
  );
};
