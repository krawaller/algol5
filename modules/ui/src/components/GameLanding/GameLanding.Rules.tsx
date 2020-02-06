import React, { FunctionComponent } from "react";
import { AlgolMeta } from "../../../../types";
import { Button } from "../Button";

import { ButtonGroup } from "../ButtonGroup";

type GameLandingAboutProps = {
  meta: AlgolMeta<string, string>;
  html: string;
};

export const GameLandingAbout: FunctionComponent<GameLandingAboutProps> = props => {
  const { meta, html } = props;
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      In the meantime you'll have to go to this external link.
      <ButtonGroup>
        <Button href={meta.source}>External rules</Button>
      </ButtonGroup>
    </div>
  );
};

export default GameLandingAbout;
