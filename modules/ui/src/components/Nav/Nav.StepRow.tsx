import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { AlgolNavStep } from "../../../../types";

import navCss from "./Nav.cssProxy";
import { NavStep } from "./Nav.Step";
import { Arrow } from "../Arrow";

type NavStepRowProps = {
  back: "pipe" | "this" | "none";
  step: AlgolNavStep;
  current?: boolean;
};

export const NavStepRow: FunctionComponent<NavStepRowProps> = props => {
  const { back, step, current } = props;
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
        <NavStep me={step} current={current} />
      </div>
      <div className={navCss.navFiller}></div>
    </div>
  );
};
