import React, { ChangeEvent, FunctionComponent } from "react";

import css from "./InputButton.cssProxy";
import { Input } from "../Input";
import { Button } from "../Button";

type InputButtonProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
  onClick?: () => void;
  inputDisabled?: boolean;
  buttonDisabled?: boolean;
};

export const InputButton: FunctionComponent<InputButtonProps> = props => {
  const {
    value,
    onChange,
    onEnter,
    onClick,
    inputDisabled,
    buttonDisabled,
    children,
  } = props;
  return (
    <div className={css.inputButton}>
      <Input
        value={value}
        onChange={onChange}
        onEnter={onEnter}
        disabled={inputDisabled}
      />
      <Button>{children}</Button>
    </div>
  );
};
