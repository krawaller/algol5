import React, { FunctionComponent, useMemo } from "react";
import css from "./RadioSelector.cssProxy";

type RadioSelectorProps = {
  value: string;
  group: string;
  options: { value: string; desc: string }[];
  onSelect: (v: string) => void;
};

export const RadioSelector: FunctionComponent<RadioSelectorProps> = props => {
  const { value, options, group, onSelect } = props;
  const opts = useMemo(
    () =>
      options.map(o => (
        <label key={o.value} className={css.radioSelectorLabel}>
          <input
            type="radio"
            id={o.value}
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
      <div className={css.radioSelectorInnerDiv}>{opts}</div>
    </div>
  );
};
