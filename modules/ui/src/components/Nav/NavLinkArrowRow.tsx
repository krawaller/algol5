import classNames from "classnames";
import React, { FunctionComponent } from "react";
import navCss from "./Nav.cssProxy";
import hintCss from "./Nav.Hint.cssProxy";
import { Arrow } from "../Arrow";
import { ArrowMulti, ArrowMultiProps } from "../Arrow/Arrow.Multi";

type NavLinkArrowRowProps = {
  nbrOfLinks: number;
  hasBackBtn?: boolean;
  hasShortcut?: boolean;
};

export const NavLinkArrowRow: FunctionComponent<NavLinkArrowRowProps> = props => {
  const { nbrOfLinks, hasBackBtn, hasShortcut } = props;
  const pieceCount = nbrOfLinks ? nbrOfLinks * 2 + (hasBackBtn ? 3 : 1) : 0;
  const middle = Math.ceil(pieceCount / 2);
  const pieces = [];
  for (let i = 1; i <= pieceCount; i++) {
    if (i % 2) {
      // filler
      pieces.push(
        <div key={i} className={navCss.navFiller}>
          {i === middle ? (
            <ArrowMulti
              {...middleArrows(nbrOfLinks, hasBackBtn, hasShortcut)}
            />
          ) : i > 1 && i < pieceCount && !(i < middle && hasBackBtn) ? (
            <Arrow layout="eastwest" />
          ) : null}
        </div>
      );
    } else {
      // above button
      pieces.push(
        <div key={i} className={navCss.navButton}>
          {i < middle ? (
            hasBackBtn ? null : i === 2 ? (
              <Arrow layout="southeast" head="south" />
            ) : (
              <ArrowMulti southeast eastwest head="south" />
            )
          ) : i === middle ? (
            <ArrowMulti
              {...middleArrows(nbrOfLinks, hasBackBtn, hasShortcut)}
            />
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
    <div className={classNames(navCss.navRow, navCss.navLinkArrowRow)}>
      <div
        className={classNames(
          navCss.navSideButtonContainer,
          hasBackBtn && hintCss.navHintBack
        )}
      >
        {hasBackBtn && <Arrow layout="northsouth" />}
      </div>
      {pieces}
      <div className={navCss.navSideButtonContainer}></div>
    </div>
  );
};

const middleArrows = (
  nbrOfLinks: number,
  hasBackBtn?: boolean,
  hasShortcut?: boolean
): ArrowMultiProps => {
  const count = nbrOfLinks + (hasBackBtn ? 1 : 0);
  const odd = Boolean(count % 2);
  const result: ArrowMultiProps = {
    head: odd ? "south" : undefined,
    northsouth: odd,
    northeast: count > 1,
    northwest: count > 1 && !hasBackBtn,
  };
  return result;
};
