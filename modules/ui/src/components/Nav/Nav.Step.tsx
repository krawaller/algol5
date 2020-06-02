import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { AlgolNavStep } from "../../../../types";
import css from "./Nav.Step.cssProxy";

type NavStepProps = {
  me: AlgolNavStep;
  current?: boolean;
};

export const NavStep: FunctionComponent<NavStepProps> = props => {
  const { me, current } = props;
  const { title, desc, onClick } = me;
  return (
    <div
      className={classNames(css.navStep, current && css.navStepCurrent)}
      onClick={current ? undefined : onClick}
    >
      <h4 className={css.navStepTitle}>{title}</h4>
      <p className={css.navStepDesc}>{desc}</p>
    </div>
  );
};
