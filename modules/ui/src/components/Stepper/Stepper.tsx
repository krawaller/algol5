import React, { FunctionComponent, ChangeEvent } from "react";
import css from "./Stepper.cssProxy";

type StepperProps = {
  onChange: (num: number) => void;
  max: number;
  current: number;
};

export const Stepper: FunctionComponent<StepperProps> = props => {
  const { onChange, max, current } = props;
  return (
    <span className={css.stepperContainer}>
      <button disabled={current === 0} onClick={() => onChange(current - 1)}>
        &lt;
      </button>
      <span className={css.stepperRangeContainer}>
        <input
          className={css.stepperRange}
          type="range"
          min={0}
          max={max}
          step={1}
          value={current}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(+e.target.value)
          }
        />
      </span>
      <button disabled={current === max} onClick={() => onChange(current + 1)}>
        &gt;
      </button>
    </span>
  );
};
