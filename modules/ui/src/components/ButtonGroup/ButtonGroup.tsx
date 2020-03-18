/*
This component is intended to be wrapped around a group of buttons. It takes care of 
centering them and adding space between the buttons.

As is it could've been just a CSS class, but it might be extended with more functionality
in the future.
*/

import React, { FunctionComponent } from "react";
import classNames from "classnames";
import css from "./ButtonGroup.cssProxy";

type ButtonGroupProps = {
  noBottomMargin?: boolean;
  merged?: boolean;
};

export const ButtonGroup: FunctionComponent<ButtonGroupProps> = props => {
  const { children, noBottomMargin, merged } = props;
  return (
    <div
      className={classNames(css.buttonGroupContainer, {
        [css.buttonGroupContainerNoBottomMargin]: noBottomMargin,
        [css.buttonGroupContainerMerged]: merged,
      })}
    >
      {children}
    </div>
  );
};
