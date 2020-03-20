import React, { FunctionComponent } from "react";
import css from "./Switch.cssProxy";

type SwitchProps = {
  flipped?: boolean;
  onFlip: () => void;
  text?: string;
};

export const Switch: FunctionComponent<SwitchProps> = props => {
  const { flipped, onFlip, text } = props;
  return (
    <label className={css.switchContainer} onClick={onFlip}>
      <input type="checkbox" checked={flipped} />
      <span className={css.switchIndicator}></span>
      {text}
    </label>
  );
};
