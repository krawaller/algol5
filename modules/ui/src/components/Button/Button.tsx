import React, { MouseEvent, ReactNode } from "react";
import classNames from "classnames";
import { preventDoubleTapZoom } from "../../helpers/preventDoubleTap";

export type ButtonProps = {
  disabled?: boolean | string;
  onClick?: (e: MouseEvent) => void;
  big?: boolean;
  onError?: (err: Error) => void;
  controlId?: string;
  text?: string;
  active?: boolean;
  intent?: "primary" | "danger" | "";
  children?: ReactNode;
};

import css from "./Button.cssProxy";
import { useButtonClickHandler } from "./Button.handler";

export const Button = (props: ButtonProps) => {
  const {
    disabled,
    onClick = preventDoubleTapZoom,
    children,
    big,
    onError,
    controlId,
    text,
    active,
    intent,
  } = props;
  const handler = useButtonClickHandler({
    disabled,
    onClick,
    onError,
    controlId,
  });
  return (
    <button
      // Having a touch handler also makes :active work on iOS
      onTouchStart={preventDoubleTapZoom}
      onClick={handler}
      className={classNames(css.button, {
        [css.buttonDisabled]: disabled,
        [css.buttonBig]: big,
        [css.buttonActive]: active,
        [css.buttonPrimary]: intent === "primary",
        [css.buttonDanger]: intent === "danger",
      })}
    >
      {text || children}
    </button>
  );
};
