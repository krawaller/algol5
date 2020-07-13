import React, { FunctionComponent } from "react";
import css from "./Box.cssProxy";

type BoxProps = {
  title: string;
};

export const Box: FunctionComponent<BoxProps> = props => {
  const { title, children } = props;
  return (
    <fieldset className={css.boxContainer}>
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
};
