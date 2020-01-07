import React from "react";
import { storiesOf } from "@storybook/react";
import { TitlePage } from ".";

storiesOf("TitlePage", module).add("Welcome! :D", () => {
  return (
    <TitlePage
      actions={{
        navTo: str => console.log("nav to", str),
        prefetch: str => console.log("prefetch", str),
      }}
    />
  );
});
