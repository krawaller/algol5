import classNames from "classnames";
import React, { FunctionComponent } from "react";
import navCss from "./Nav.cssProxy";
import hintCss from "./Nav.Hint.cssProxy";
import { Arrow } from "../Arrow";
import { ArrowMulti, ArrowMultiProps } from "../Arrow/Arrow.Multi";
import { DASHED_SHORTCUTS } from "./Nav.constants";

type NavLinkArrowRowProps = {
  nbrOfLinks: number;
  hasBackBtn?: boolean;
  hasShortcut?: boolean;
};

export const NavLinkArrowRow: FunctionComponent<NavLinkArrowRowProps> = props => {
  const { nbrOfLinks, hasBackBtn, hasShortcut } = props;
  const buttonCount = nbrOfLinks + (hasBackBtn ? 1 : 0);
  const pieceCount = buttonCount * 2 - 1;
  const middle = Math.ceil(pieceCount / 2);
  const pieces = [];
  for (let i = 1; i <= pieceCount; i++) {
    const side = i < middle ? "left" : i > middle ? "right" : "middle";
    if (i % 2) {
      pieces.push(
        <div key={i} className={navCss.navButton}>
          {aboveButtonArrows(side, buttonCount, hasBackBtn, hasShortcut)}
        </div>
      );
    } else {
      pieces.push(
        <div key={i} className={navCss.navFiller}>
          {spaceArrows(side, buttonCount, hasBackBtn, hasShortcut)}
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
        {hasBackBtn && <Arrow layout="northsouth" dashed={DASHED_SHORTCUTS} />}
      </div>
      <div className={navCss.navFiller} />
      {pieces}
      <div className={navCss.navFiller}>
        {hasShortcut && <Arrow layout="southeast" dashed={DASHED_SHORTCUTS} />}
      </div>
      <div
        className={classNames(
          navCss.navSideButtonContainer,
          hasShortcut && hintCss.navHintShortcut
        )}
      >
        {hasShortcut && <Arrow layout="northwest" dashed={DASHED_SHORTCUTS} />}
      </div>
    </div>
  );
};

const spaceArrows = (
  side: "left" | "middle" | "right",
  buttonCount: number,
  hasBackBtn?: boolean,
  hasShortcut?: boolean
) => (
  <ArrowMulti
    northwest={side === "middle" && buttonCount > 1 && !hasBackBtn}
    northeast={side === "middle" && buttonCount > 1 && !hasShortcut}
    eastwest={
      (side === "left" && buttonCount > 1 && !hasBackBtn) ||
      (side === "right" && buttonCount > 1 && !hasShortcut)
    }
  />
);

const aboveButtonArrows = (
  side: "left" | "middle" | "right",
  buttonCount: number,
  hasBackBtn?: boolean,
  hasShortcut?: boolean
) => (
  <ArrowMulti
    head={
      (side === "middle" && (!hasBackBtn || buttonCount > 1)) ||
      (side === "right" && !hasShortcut) ||
      (side === "left" && !hasBackBtn)
        ? "south"
        : undefined
    }
    northsouth={side === "middle" && (!hasBackBtn || buttonCount > 1)}
    northeast={side === "middle" && buttonCount > 1 && !hasShortcut}
    northwest={side === "middle" && buttonCount > 1 && !hasBackBtn}
    southeast={side === "left" && !hasBackBtn}
    southwest={side === "right" && !hasShortcut}
  />
);
