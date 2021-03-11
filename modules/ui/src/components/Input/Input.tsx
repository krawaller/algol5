import React, {
  FunctionComponent,
  ChangeEvent,
  useRef,
  useEffect,
  KeyboardEvent,
  useCallback,
} from "react";
import css from "./Input.cssProxy";
import { AlgolError } from "../../../../types";

type InputProps = {
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onValue?: (str: string) => void;
  onEnter?: () => void;
  onError?: (err: AlgolError) => void;
  autoFocus?: boolean;
  autoSelect?: boolean;
  disabled?: boolean;
  placeholder?: string;
  controlId?: string;
  password?: boolean;
};

export const Input: FunctionComponent<InputProps> = props => {
  const {
    value,
    onChange,
    onValue,
    autoFocus,
    autoSelect,
    onEnter,
    onError,
    disabled,
    placeholder,
    controlId,
    password,
  } = props;
  const ref = useRef<HTMLInputElement>(null);
  const haveSelected = useRef<boolean>(false);
  useEffect(() => {
    if (autoSelect && ref.current && !haveSelected.current) {
      ref.current.select();
      haveSelected.current = true;
    }
  }, [ref.current, haveSelected.current, autoSelect]);
  const handleEnter = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && onEnter) {
        if (onError) {
          try {
            onEnter();
          } catch (e) {
            const decoratedError: AlgolError = e;
            decoratedError.controlId = controlId;
            onError(decoratedError);
          }
        } else {
          onEnter();
        }
      }
    },
    [onEnter, onError, controlId]
  );
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      } else if (onValue) {
        onValue(e.target.value);
      }
    },
    [onChange, onValue]
  );
  return (
    <input
      placeholder={placeholder}
      ref={ref}
      disabled={disabled}
      onKeyDown={handleEnter}
      onChange={handleChange}
      value={value}
      type={password ? "password" : "text"}
      className={css.input}
      autoFocus={autoFocus}
    />
  );
};
