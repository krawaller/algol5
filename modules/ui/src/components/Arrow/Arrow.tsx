import React, { FunctionComponent } from "react";
import classNames from "classnames";
import css from "./Arrow.cssProxy";

export type ArrowLayout = keyof typeof layoutClassMap;
export type ArrowHead = keyof typeof headClassMap;

export type ArrowProps = {
  layout: ArrowLayout;
  head?: ArrowHead;
};

const layoutClassMap = {
  eastwest: css.arrowEastWest,
  northsouth: css.arrowNorthSouth,
  southeast: css.arrowSouthEast,
  southwest: css.arrowSouthWest,
  northwest: css.arrowNorthWest,
  northeast: css.arrowNorthEast,
};

const headClassMap = {
  north: css.arrowHeadNorth,
  south: css.arrowHeadSouth,
  east: css.arrowHeadEast,
  west: css.arrowHeadWest,
};

export const arrowLayouts = Object.keys(layoutClassMap) as ArrowLayout[];
export const arrowHeads = ["none"].concat(
  Object.keys(headClassMap)
) as ArrowHead[];

export const Arrow: FunctionComponent<ArrowProps> = props => {
  const { layout, head } = props;
  return (
    <div
      className={classNames(
        css.arrowContainer,
        layoutClassMap[layout],
        head && headClassMap[head]
      )}
    ></div>
  );
};
