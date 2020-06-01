import classNames from "classnames";
import React, { FunctionComponent } from "react";
import css from "./Nav.cssProxy";
import { Arrow } from "../Arrow";
import { ArrowMulti } from "../Arrow/Arrow.Multi";

type NavLinkArrowRowProps = {
  nbrOfLinks: number;
  hasBackBtn?: boolean;
};

export const NavLinkArrowRow: FunctionComponent<NavLinkArrowRowProps> = props => {
  const { nbrOfLinks, hasBackBtn } = props;
  const pieceCount = nbrOfLinks ? nbrOfLinks * 2 + 1 : 0;
  const middle = Math.ceil(pieceCount / 2);
  const pieces = [];
  for (let i = 1; i <= pieceCount; i++) {
    if (i % 2) {
      // filler
      pieces.push(
        <div key={i} className={css.navFiller}>
          {i === middle ? (
            <ArrowMulti northwest northeast />
          ) : i > 1 && i < pieceCount ? (
            <Arrow layout="eastwest" />
          ) : null}
        </div>
      );
    } else {
      // above button
      pieces.push(
        <div key={i} className={css.navButton}>
          {i < middle ? (
            i === 2 ? (
              <Arrow layout="southeast" head="south" />
            ) : (
              <ArrowMulti southeast eastwest head="south" />
            )
          ) : i === middle ? (
            nbrOfLinks === 1 ? (
              <Arrow layout="northsouth" head="south" />
            ) : (
              <ArrowMulti head="south" northsouth northeast northwest />
            )
          ) : i === pieceCount - 1 ? (
            <Arrow layout="southwest" head="south" />
          ) : (
            <ArrowMulti southwest eastwest head="south" />
          )}
        </div>
      );
    }
  }
  return (
    <div className={classNames(css.navRow, css.navLinkArrowRow)}>
      <div className={css.navSideButtonContainer}>
        {hasBackBtn && <Arrow layout="northsouth" />}
      </div>
      {pieces}
      <div className={css.navSideButtonContainer}></div>
    </div>
  );
};
