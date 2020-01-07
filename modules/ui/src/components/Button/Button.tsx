import React, { FunctionComponent, MouseEvent } from "react";
import classNames from "classnames";

type ButtonProps = {
  disabled?: boolean;
  onClick: (e: MouseEvent) => void;
};
import css from "./Button.cssProxy";

export const Button: FunctionComponent<ButtonProps> = props => {
  const { disabled, onClick } = props;
  return (
    <button onClick={onClick} disabled={disabled} className={css.button}>
      Hello!
    </button>
  );
};
