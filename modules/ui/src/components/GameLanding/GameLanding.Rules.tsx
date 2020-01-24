import React, { FunctionComponent } from "react";
import { AlgolMeta } from "../../../../types";
import { Button } from "../Button";

import { ButtonGroup } from "../ButtonGroup";

type GameLandingAboutProps = {
  meta: AlgolMeta<string, string>;
};

export const GameLandingAbout: FunctionComponent<GameLandingAboutProps> = props => {
  const { meta } = props;
  return (
    <div>
      Eventually the rules will be displayed here inside the app, but for now
      you'll have to go to this external link.
      <ButtonGroup>
        <Button href={meta.source}>External rules</Button>
      </ButtonGroup>
    </div>
  );
};

export default GameLandingAbout;
