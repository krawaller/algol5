import React, { FunctionComponent, ChangeEvent } from "react";
import css from "./Stepper.cssProxy";
import { Flicker } from "../Flicker";

type StepperProps = {
  onChange: (num: number) => void;
  max: number;
  current: number;
};

export const Stepper: FunctionComponent<StepperProps> = props => {
  const { onChange, max, current } = props;
  return (
    <Flicker
      leftDisabled={current === 0}
      onLeft={() => onChange(current - 1)}
      rightDisabled={current === max}
      onRight={() => onChange(current + 1)}
    >
      <input
        className={css.stepperRange}
        type="range"
        min={0}
        max={max}
        step={1}
        value={current}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(+(e.target as any).value)
        }
      />
    </Flicker>
  );
};
