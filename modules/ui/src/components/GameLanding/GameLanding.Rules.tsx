import React, { FunctionComponent } from "react";
import { AlgolMeta } from "../../../../types";
import { Button } from "../Button";

import css from "./GameLanding.cssProxy";

type GameLandingAboutProps = {
  meta: AlgolMeta<string, string>;
};

export const GameLandingAbout: FunctionComponent<GameLandingAboutProps> = props => {
  const { meta } = props;
  return (
    <div>
      Eventually the rules will be displayed here inside the app, but for now
      you'll have to go to this external link.
      <div className={css.gameLandingButtons}>
        <Button href={meta.source}>External rules</Button>
      </div>
    </div>
  );
};

export default GameLandingAbout;
