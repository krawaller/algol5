import React, {
  FunctionComponent,
  ChangeEvent,
  useRef,
  useEffect,
  KeyboardEvent,
  useCallback,
} from "react";
import css from "./Input.cssProxy";

type InputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
  autoFocus?: boolean;
  autoSelect?: boolean;
};

export const Input: FunctionComponent<InputProps> = props => {
  const { value, onChange, autoFocus, autoSelect, onEnter } = props;
  const ref = useRef<HTMLInputElement>(null);
  const haveSelected = useRef<boolean>(false);
  useEffect(() => {
    if (autoSelect && ref.current && !haveSelected.current) {
      ref.current.select();
      haveSelected.current = true;
    }
  }, [ref.current, haveSelected.current, autoSelect]);
  const handleEnter = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter" && onEnter) {
      onEnter();
    }
  }, []);
  return (
    <input
      ref={ref}
      onKeyDown={handleEnter}
      onChange={onChange}
      value={value}
      type="text"
      className={css.input}
      autoFocus={autoFocus}
    />
  );
};
