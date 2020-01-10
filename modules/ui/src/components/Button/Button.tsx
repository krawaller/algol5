import React, { FunctionComponent, MouseEvent, useMemo } from "react";
import classNames from "classnames";
import { preventDoubleTapZoom } from "./Button.preventDoubleTap";

type ButtonProps = {
  disabled?: boolean | string;
  onClick?: (e: MouseEvent) => void;
  href?: string;
  big?: boolean;
};
import css from "./Button.cssProxy";

const noop = () => {};

export const Button: FunctionComponent<ButtonProps> = props => {
  const { disabled, onClick = noop, children, href, big } = props;
  const handler =
    href || disabled === true
      ? noop
      : typeof disabled === "string"
      ? () => alert(disabled)
      : (e: MouseEvent) => {
          onClick(e);
          preventDoubleTapZoom(e);
        };

  const button = (
    <button
      // Having a touch handler also makes :active work on iOS
      onTouchStart={preventDoubleTapZoom}
      onClick={handler}
      className={classNames(css.button, {
        [css.buttonDisabled]: disabled,
        [css.buttonBig]: big,
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
