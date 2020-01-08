import React, { FunctionComponent, MouseEvent } from "react";
import classNames from "classnames";

type ButtonProps = {
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
  notImplemented?: string;
};
import css from "./Button.cssProxy";

const noop = () => {};

export const Button: FunctionComponent<ButtonProps> = props => {
  const { disabled, onClick = noop, children, notImplemented } = props;
  return (
    <button
      onClick={notImplemented ? () => alert(notImplemented) : onClick}
      disabled={disabled}
      className={classNames(css.button, {
        [css.buttonNotImplemented]: notImplemented,
      })}
    >
      {children}
    </button>
  );
};
