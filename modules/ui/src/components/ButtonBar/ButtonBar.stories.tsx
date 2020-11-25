import React from "react";
import { storiesOf } from "@storybook/react";
import { number, NumberOptions } from "@storybook/addon-knobs";

import { ButtonBar } from ".";

storiesOf("ButtonBar", module).add("A common ButtonBar component", () => {
  const texts = ["Exit light", "Enter night"];
  const onChange = (i: number) => console.log("Clicked", texts[i]);
  const numOpts: NumberOptions = {
    min: 0,
    max: texts.length - 1,
    step: 1,
    range: false,
  };
  const current = number("Index", 0, numOpts);
  return (
    <div style={{ padding: 10 }}>
      <ButtonBar current={current} onChange={onChange} texts={texts} />
    </div>
  );
});
