import React, { FunctionComponent } from "react";
import { AlgolNavLink } from "../../../../types";
import css from "./Nav.Step.cssProxy";

type NavStepProps = {
  me: AlgolNavLink;
  current?: boolean;
};

export const NavStep: FunctionComponent<NavStepProps> = props => {
  const { title, desc } = props.me;
  return (
    <div className={css.navStep}>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
};
