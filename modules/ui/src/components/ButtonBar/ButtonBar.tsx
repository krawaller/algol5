import React, { FunctionComponent } from "react";
import { Button } from "../Button/Button";
import css from "./ButtonBar.cssProxy";

type ButtonBarProps = {
  texts: string[];
  onChange: (i: number) => void;
  current: number;
};

export const ButtonBar: FunctionComponent<ButtonBarProps> = props => {
  const { texts, current, onChange } = props;
  const buttons = texts.map((text, i) => (
    <Button
      key={i}
      text={text}
      onClick={() => onChange(i)}
      active={i === current}
    />
  ));
  return <div className={css.buttonBarContainer}>{buttons}</div>;
};
