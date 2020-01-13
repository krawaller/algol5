import React, { ChangeEvent, FunctionComponent } from "react";

import css from "./InputButton.cssProxy";
import { Input } from "../Input";
import { Button } from "../Button";

type InputButtonProps = {
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onValue?: (str: string) => void;
  onEnter?: () => void;
  onClick?: () => void;
  inputDisabled?: boolean;
  buttonDisabled?: boolean;
  autoFocus?: boolean;
  autoSelect?: boolean;
};

export const InputButton: FunctionComponent<InputButtonProps> = props => {
  const {
    value,
    onChange,
    onValue,
    onEnter,
    onClick,
    inputDisabled,
    buttonDisabled,
    children,
    autoFocus,
    autoSelect,
  } = props;
  return (
    <div className={css.inputButton}>
      <Input
        value={value}
        onChange={onChange}
        onValue={onValue}
        onEnter={onEnter}
        disabled={inputDisabled}
        autoFocus={autoFocus}
        autoSelect={autoSelect}
      />
      <Button onClick={onClick} disabled={buttonDisabled}>
        {children}
      </Button>
    </div>
  );
};
