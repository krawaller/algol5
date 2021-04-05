import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { AlgolNavStep } from "../../../../types";
import stepCss from "./Nav.Step.cssProxy";
import navCss from "./Nav.cssProxy";
import hintCss from "./Nav.Hint.cssProxy";
import { useNavHandler } from "./Nav.useNavHandler";
import { AppActions } from "../../contexts";

type NavStepProps = {
  step: AlgolNavStep;
  isCurrent?: boolean;
  mute?: boolean;
  actions: AppActions;
};

export const NavStep: FunctionComponent<NavStepProps> = props => {
  const { step, isCurrent, actions, mute } = props;
  const { title, desc } = step;
  const handleClick = useNavHandler({ actions, step });
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
