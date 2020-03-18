import React, { FunctionComponent, MouseEvent } from "react";
import classNames from "classnames";
import { preventDoubleTapZoom } from "./Button.preventDoubleTap";

export type ButtonProps = {
  disabled?: boolean | string;
  onClick?: (e: MouseEvent) => void;
  href?: string;
  big?: boolean;
  onError?: (err: Error) => void;
  controlId?: string;
  text?: string;
  active?: boolean;
};

import css from "./Button.cssProxy";
import { useButtonClickHandler } from "./Button.handler";

export const Button: FunctionComponent<ButtonProps> = props => {
  const {
    disabled,
    onClick = preventDoubleTapZoom,
    children,
    href,
    big,
    onError,
    controlId,
    text,
    active,
  } = props;
  const handler = useButtonClickHandler({
    href,
    disabled,
    onClick,
    onError,
    controlId,
  });
  const button = (
    <button
      // Having a touch handler also makes :active work on iOS
      onTouchStart={preventDoubleTapZoom}
      onClick={handler}
      className={classNames(css.button, {
        [css.buttonDisabled]: disabled,
        [css.buttonBig]: big,
        [css.buttonActive]: active,
      })}
    >
      {text || children}
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
