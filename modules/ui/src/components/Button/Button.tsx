import React, { FunctionComponent, MouseEvent } from "react";

type ButtonProps = {
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
};
import css from "./Button.cssProxy";

const noop = () => {};

export const Button: FunctionComponent<ButtonProps> = props => {
  const { disabled, onClick = noop, children } = props;
  return (
    <button onClick={onClick} disabled={disabled} className={css.button}>
      {children}
    </button>
  );
};
