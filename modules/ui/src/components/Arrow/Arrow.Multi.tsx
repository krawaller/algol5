import React, { FunctionComponent } from "react";
import classNames from "classnames";
import css from "./Arrow.cssProxy";
import { ArrowFlush, ArrowLayout, ArrowHead, Arrow } from "./Arrow";

export type ArrowMultiProps = {
  head?: ArrowHead;
  flush?: ArrowFlush;
} & Partial<{ [layout in ArrowLayout]: boolean }>;

export const ArrowMulti: FunctionComponent<ArrowMultiProps> = props => {
  const {
    head,
    flush,
    southeast,
    southwest,
    northeast,
    northwest,
    northsouth,
    eastwest,
  } = props;
  return (
    <div className={classNames(css.arrowMultiContainer)}>
      {southeast && <Arrow flush={flush} head={head} layout="southeast" />}
      {southwest && <Arrow flush={flush} head={head} layout="southwest" />}
      {northeast && <Arrow flush={flush} head={head} layout="northeast" />}
      {northwest && <Arrow flush={flush} head={head} layout="northwest" />}
      {northsouth && <Arrow flush={flush} head={head} layout="northsouth" />}
      {eastwest && <Arrow flush={flush} head={head} layout="eastwest" />}
    </div>
  );
};
