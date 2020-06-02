import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { AlgolNavStep, AppActions } from "../../../../types";

import navCss from "./Nav.cssProxy";
import navStepCss from "./Nav.Step.cssProxy";
import { NavStep } from "./Nav.Step";
import { Arrow } from "../Arrow";
import { NavButton } from "./Nav.Button";

type NavStepRowProps = {
  back: "pipe" | "this" | "none";
  step: AlgolNavStep;
  current?: boolean;
  mute?: boolean;
  skipLink?: string;
  actions: AppActions;
};

export const NavStepRow: FunctionComponent<NavStepRowProps> = props => {
  const { back, step, current, skipLink, actions, mute } = props;
  return (
    <div className={navCss.navRow}>
      <div className={classNames(navCss.navFiller, navCss.navFlexLeft)}>
        <div className={navCss.navSideButtonContainer}>
          {back !== "none" && (
            <Arrow layout={back === "this" ? "southeast" : "northsouth"} />
          )}
        </div>
        {back === "this" && (
          <div className={navCss.navFiller}>
            <Arrow layout="eastwest" head="east" />
          </div>
        )}
      </div>
      <div className={navCss.navRowStepContainer}>
        <NavStep
          step={step}
          isCurrent={current}
          actions={actions}
          mute={mute}
        />
      </div>
      <div className={classNames(navCss.navFiller, navStepCss.navStepLinkBox)}>
        {!current &&
          step.links
            .filter(l => l.title != skipLink)
            .map(l => (
              <div className={navStepCss.navStepLinkEntry} key={l.title}>
                <Arrow head="east" layout="eastwest" />
                <NavButton step={l} actions={actions} mute={mute} />
              </div>
            ))}
      </div>
    </div>
  );
};
