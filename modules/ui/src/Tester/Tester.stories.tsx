import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Tester } from ".";
import { GameId, list } from "../../../games/dist/list";

import APIs from "../../../battle/dist/allAPIs";

storiesOf("Tester", module).add("Test games", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  return (
    <Wrapper>
      <Tester key={gameId} api={APIs[gameId]} />
    </Wrapper>
  );
});

const Wrapper: React.FunctionComponent<{}> = props => (
  <div>{props.children}</div>
);
