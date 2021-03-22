import React from "react";

import css from "./List.cssProxy";

type ListItemProps = {
  title?: string;
  content?: JSX.Element;
  pic?: JSX.Element;
  onClick?: () => void;
};

export const ListItem = ({
  title,
  content,
  pic,
  onClick = () => {},
}: ListItemProps) => {
  return (
    <div className={css.listItem} onClick={onClick}>
      <div className={css.listItemPic}>{pic}</div>
      <div className={css.listItemContent}>
        {title && <h4 className={css.listItemTitle}>{title}</h4>}
        {content}
      </div>
    </div>
  );
};
