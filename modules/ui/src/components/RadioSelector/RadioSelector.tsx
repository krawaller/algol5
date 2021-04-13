import React, { FunctionComponent, useMemo } from "react";
import css from "./RadioSelector.cssProxy";

type RadioSelectorProps = {
  value: string | number;
  group: string;
  options: { value: string | number; desc: string }[];
  onSelect: (v: string | number) => void;
  title?: string;
};

export const RadioSelector: FunctionComponent<RadioSelectorProps> = props => {
  const { value, options, group, onSelect, title } = props;
  const opts = useMemo(
    () =>
      options.map(o => (
        <label key={o.value} className={css.radioSelectorLabel}>
          <input
            type="radio"
            id={String(o.value)}
            name={group}
            value={o.value}
            checked={o.value === value}
            onChange={() => onSelect(o.value)}
          />
          {o.desc}
        </label>
      )),
    [value, options, group, onSelect]
  );
  return (
    <div>
      {title && <div className={css.radioSelectorTitle}>{title}</div>}
      <div className={css.radioSelectorInnerDiv}>{opts}</div>
    </div>
  );
};
