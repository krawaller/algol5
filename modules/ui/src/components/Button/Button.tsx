import React, { FunctionComponent, MouseEvent } from "react";
import classNames from "classnames";

type ButtonProps = {
  disabled?: boolean | string;
  onClick?: (e: MouseEvent) => void;
  href?: string;
};
import css from "./Button.cssProxy";

const noop = () => {};

export const Button: FunctionComponent<ButtonProps> = props => {
  const { disabled, onClick = noop, children, href } = props;
  const handler =
    href || disabled === true
      ? noop
      : typeof disabled === "string"
      ? () => alert(disabled)
      : onClick;
  const button = (
    <button
      onClick={handler}
      className={classNames(css.button, {
        [css.buttonDisabled]: disabled,
      })}
    >
      {children}
    </button>
  );
  return href ? (
    <a className={css.buttonLink} href={href} target="_blank">
      {button}
    </a>
  ) : (
    button
  );
};
