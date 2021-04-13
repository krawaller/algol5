import classNames from "classnames";
import React, { FunctionComponent, Fragment } from "react";
import { AlgolNavStep } from "../../../../types";
import { DASHED_SHORTCUTS, SHORTCUT_STRATEGY } from "./Nav.constants";

import navCss from "./Nav.cssProxy";
import navStepCss from "./Nav.Step.cssProxy";
import { NavStep } from "./Nav.Step";
import { Arrow } from "../Arrow";
import { NavButton } from "./Nav.Button";

type NavStepRowProps = {
  hasBackBtn?: boolean;
  shortcut?: AlgolNavStep | null;
  step: AlgolNavStep;
  mute?: boolean;
  skipLink?: string;
  position: "current" | "prior" | "other";
};

export const NavStepRow: FunctionComponent<NavStepRowProps> = props => {
  const { step, mute, position } = props;
  return (
    <div className={navCss.navRow}>
      <LeftSide {...props} />
      <div className={navCss.navRowStepContainer}>
        <NavStep step={step} isCurrent={position === "current"} mute={mute} />
      </div>
      <RightSide {...props} />
    </div>
  );
};

const LeftSide = ({ hasBackBtn, position }: NavStepRowProps) => (
  <div className={classNames(navCss.navFiller, navCss.navFlexLeft)}>
    <div className={navCss.navSideButtonContainer}>
      {hasBackBtn && position !== "other" && (
        <Arrow
          layout={position === "prior" ? "southeast" : "northsouth"}
          dashed={DASHED_SHORTCUTS}
        />
      )}
    </div>
    {hasBackBtn && position === "prior" && (
      <div className={navCss.navFiller}>
        <Arrow layout="eastwest" head="east" dashed={DASHED_SHORTCUTS} />
      </div>
    )}
  </div>
);

const RightSide = ({
  shortcut,
  position,
  skipLink,
  mute,
  step,
}: NavStepRowProps) => {
  if (shortcut && position === "current" && SHORTCUT_STRATEGY === "top") {
    return (
      <div className={classNames(navCss.navFiller, navCss.navFlexRight)}>
        <div className={navCss.navSideButtonContainer}>
          <Arrow layout="northsouth" dashed />
        </div>
      </div>
    );
  }
  if (shortcut && position === "prior" && SHORTCUT_STRATEGY === "middle") {
    return (
      <div className={classNames(navCss.navFiller, navCss.navFlexRight)}>
        <div className={navCss.navFiller}>
          <Arrow layout="eastwest" />
        </div>
        <div className={navCss.navSideButtonContainer}>
          <Arrow layout="southwest" />
        </div>
      </div>
    );
  }
  if (shortcut && position === "current" && SHORTCUT_STRATEGY === "middle") {
    return (
      <div className={classNames(navCss.navFiller, navStepCss.navStepLinkBox)}>
        <div className={classNames(navCss.navFiller, navCss.navFlexRight)}>
          <div className={navCss.navSideButtonContainer}>
            <Arrow layout="northsouth" head="south" />
          </div>
        </div>
        <div
          className={classNames(
            navStepCss.navStepLinkEntry,
            navCss.navFlexRight
          )}
        >
          <div className="arrowContainer" />
          <NavButton step={shortcut} mute={mute} />
        </div>
        <div className={classNames(navCss.navFiller, navCss.navFlexRight)}>
          <div className={navCss.navSideButtonContainer}>
            <Arrow layout="northsouth" head="north" dashed={DASHED_SHORTCUTS} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames(navCss.navFiller, navStepCss.navStepLinkBox)}>
      <div className={navCss.navFiller} />
      {position !== "current" &&
        step.links
          .filter(l => l.title != skipLink)
          .map(l => (
            <Fragment key={l.title}>
              <div className={navStepCss.navStepLinkEntry}>
                <Arrow head="east" layout="eastwest" />
                <NavButton step={l} mute={mute} />
              </div>
              <div
                className={classNames(
                  navCss.navFiller,
                  shortcut && position === "prior" && navCss.navFlexRight
                )}
              >
                {shortcut &&
                  position === "prior" &&
                  SHORTCUT_STRATEGY === "top" && (
                    <div className={navCss.navSideButtonContainer}>
                      <Arrow
                        layout="northsouth"
                        head="north"
                        dashed={DASHED_SHORTCUTS}
                      />
                    </div>
                  )}
              </div>
            </Fragment>
          ))}
    </div>
  );
};
