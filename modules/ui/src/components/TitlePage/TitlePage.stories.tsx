import React from "react";
import { storiesOf } from "@storybook/react";
import { TitlePage } from ".";
import { fakeAppActions } from "../../../../types";

storiesOf("TitlePage", module).add("Welcome! :D", () => {
  return (
    <TitlePage
      actions={fakeAppActions}
    />
  );
});
