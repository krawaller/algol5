import React, { FunctionComponent } from "react";
import { AlgolMeta } from "../../../../types";
import { Button } from "../Button";
import { Markdown } from "../Markdown";

import { ButtonGroup } from "../ButtonGroup";

export interface GameLandingRulesActions {
  navTo: (path: string) => void;
}

type GameLandingRulesProps = {
  meta: AlgolMeta<string, string>;
  html: string;
  actions: GameLandingRulesActions;
};

export const GameLandingRules: FunctionComponent<GameLandingRulesProps> = props => {
  const { meta, html, actions } = props;
  return (
    <div>
      <Markdown actions={actions} html={html} />
      <hr />
      You can also visit external rules here:
      <ButtonGroup>
        <Button href={meta.source}>External rules</Button>
      </ButtonGroup>
    </div>
  );
};

export default GameLandingRules;
