import React, { FunctionComponent } from "react";
import classNames from "classnames";
import css from "./TabBar.cssProxy";

export type TabBarActions = {
  foo: () => void;
};

type TabBarProps<T extends string = string> = {
  onTabClick: (to: T) => void;
  labels: Record<T, string>;
  current: T;
};

export const TabBar: FunctionComponent<TabBarProps> = props => {
  const { onTabClick, labels, current } = props;
  return (
    <ul className={css.tabBarContainer}>
      {Object.keys(labels).map(key => (
        <li
          key={key}
          className={classNames(
            css.tabBarTab,
            current === key && css.tabBarTabSelected
          )}
          onClick={() => onTabClick(key)}
        >
          {labels[key]}
        </li>
      ))}
    </ul>
  );
};
