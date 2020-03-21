import React, { FunctionComponent } from "react";
import css from "./ScrollBox.cssProxy";

export const ScrollBox: FunctionComponent = props => (
  <div className={css.scrollBoxContainer}>
    <div className={css.scrollBoxContent}>{props.children}</div>
  </div>
);
