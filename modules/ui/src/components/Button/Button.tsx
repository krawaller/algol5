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
import { useButtonClickHandler } from "./Button.handler";

export const Button: FunctionComponent<ButtonProps> = props => {
  const {
    disabled,
    onClick = preventDoubleTapZoom,
    children,
    href,
    big,
  } = props;
  const handler = useButtonClickHandler({ href, disabled, onClick });
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
