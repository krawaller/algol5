import React from "react";
import { storiesOf } from "@storybook/react";
import { Page } from ".";

storiesOf("Page", module).add("The basic page shell", () => {
  return (
    <Page
      title="Page title here"
      top={<img src="/images/title.png" />}
      body={<p>page content goes here</p>}
    />
  );
});
