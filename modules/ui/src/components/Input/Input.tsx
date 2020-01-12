import React, {
  FunctionComponent,
  ChangeEvent,
  useRef,
  useEffect,
} from "react";
import css from "./Input.cssProxy";

type InputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  autoSelect?: boolean;
};

export const Input: FunctionComponent<InputProps> = props => {
  const { value, onChange, autoFocus, autoSelect } = props;
  const ref = useRef<HTMLInputElement>(null);
  const haveSelected = useRef<boolean>(false);
  useEffect(() => {
    if (autoSelect && ref.current && !haveSelected.current) {
      ref.current.select();
      haveSelected.current = true;
    }
  }, [ref.current, haveSelected.current, autoSelect]);
  return (
    <input
      ref={ref}
      onChange={onChange}
      value={value}
      type="text"
      className={css.input}
      autoFocus={autoFocus}
    />
  );
};
