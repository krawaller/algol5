import React from "react";
import { storiesOf } from "@storybook/react";
import { AuthGuard } from "./AuthGuard";

storiesOf("AuthGuard", module).add(
  "The signin form from the firebase module",
  () => {
    return (
      <div style={{ padding: 10 }}>
        <AuthGuard Content={() => <p>Secret stuff</p>} />
      </div>
    );
  }
);
