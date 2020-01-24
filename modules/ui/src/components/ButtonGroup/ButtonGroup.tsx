/*
This component is intended to be wrapped around a group of buttons. It takes care of 
centering them and adding space between the buttons.

As is it could've been just a CSS class, but it might be extended with more functionality
in the future.
*/

import React, { FunctionComponent } from "react";
import css from "./ButtonGroup.cssProxy";

export const ButtonGroup: FunctionComponent = props => {
  const { children } = props;
  return <div className={css.buttonGroupContainer}>{children}</div>;
};
