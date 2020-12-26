import React, { FunctionComponent } from "react";
import { Button } from "../Button";
import css from "./Flicker.cssProxy";

type FlickerProps = {
  onLeft: () => void;
  onRight: () => void;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
};

export const Flicker: FunctionComponent<FlickerProps> = props => {
  const { onLeft, onRight, leftDisabled, rightDisabled, children } = props;
  return (
    <div className={css.flickerContainer}>
      <div className={css.flickerButton}>
        <Button onClick={onLeft} disabled={leftDisabled} text="←" />
      </div>
      <div className={css.flickerContent}>{children}</div>
      <div className={css.flickerButton}>
        <Button onClick={onRight} disabled={rightDisabled} text="→" />
      </div>
    </div>
  );
};
