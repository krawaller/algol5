import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { AlgolNavStep, AppActions } from "../../../../types";
import css from "./Nav.Step.cssProxy";
import { useNavHandler } from "./Nav.useNavHandler";

type NavStepProps = {
  step: AlgolNavStep;
  isCurrent?: boolean;
  actions: AppActions;
};

export const NavStep: FunctionComponent<NavStepProps> = props => {
  const { step, isCurrent, actions } = props;
  const { title, desc } = step;
  const handleClick = useNavHandler({ actions, step });
  return (
    <div
      className={classNames(css.navStep, isCurrent && css.navStepCurrent)}
      onClick={isCurrent ? undefined : handleClick}
    >
      <h4 className={css.navStepTitle}>{title}</h4>
      <p className={css.navStepDesc}>{desc}</p>
    </div>
  );
};
