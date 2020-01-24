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
  onError?: (err: Error) => void;
  inputDisabled?: boolean;
  buttonDisabled?: boolean | string;
  autoFocus?: boolean;
  autoSelect?: boolean;
  placeholder?: string;
  controlId?: string;
};

export const InputButton: FunctionComponent<InputButtonProps> = props => {
  const {
    value,
    onChange,
    onValue,
    onEnter,
    onClick,
    onError,
    inputDisabled,
    buttonDisabled,
    children,
    autoFocus,
    autoSelect,
    placeholder,
    controlId,
  } = props;
  return (
    <div className={css.inputButton}>
      <Input
        value={value}
        onChange={onChange}
        onValue={onValue}
        onEnter={onEnter}
        onError={onError}
        controlId={controlId}
        disabled={inputDisabled}
        autoFocus={autoFocus}
        autoSelect={autoSelect}
        placeholder={placeholder}
      />
      <Button
        onClick={onClick}
        disabled={buttonDisabled}
        controlId={controlId}
        onError={onError}
      >
        {children}
      </Button>
    </div>
  );
};
