import React from "react";
import { storiesOf } from "@storybook/react";
import { TitlePage } from ".";

storiesOf("TitlePage", module).add("Welcome! :D", () => {
  return (
    <div style={{ height: 700, width: 400 }}>
      <TitlePage />
    </div>
  );
});
