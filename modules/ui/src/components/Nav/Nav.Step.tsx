import classNames from "classnames";
import React from "react";
import { AlgolNavStep } from "../../../../types";
import stepCss from "./Nav.Step.cssProxy";
import navCss from "./Nav.cssProxy";
import hintCss from "./Nav.Hint.cssProxy";
import { useNavHandler } from "./Nav.useNavHandler";

type NavStepProps = {
  step: AlgolNavStep;
  isCurrent?: boolean;
  mute?: boolean;
};

export const NavStep = (props: NavStepProps) => {
  const { step, isCurrent, mute } = props;
  const { title, desc } = step;
  const handleClick = useNavHandler({ step });
  return (
    <div
      className={classNames(
        stepCss.navStep,
        isCurrent && stepCss.navStepCurrent,
        isCurrent && hintCss.navHintYouAreHere,
        mute && navCss.navMute
      )}
      onClick={isCurrent || mute ? undefined : handleClick}
    >
      <h4 className={stepCss.navStepTitle}>{title}</h4>
      <p className={stepCss.navStepDesc}>{desc}</p>
    </div>
  );
};
