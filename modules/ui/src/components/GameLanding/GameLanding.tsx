import React, { FunctionComponent } from "react";
import styles from "./GameLanding.cssProxy";
import { AlgolMeta, AlgolBattleSave } from "../../../../types";

type GameLandingProps = {
  meta: AlgolMeta<string, string>;
  callback: (action: ["new", null] | ["load", AlgolBattleSave]) => void;
};

export const GameLanding: FunctionComponent<GameLandingProps> = props => {
  const { meta, callback } = props;
  return (
    <div className={styles.gameLanding}>
      <button
        className={styles.gameButtonLink}
        onClick={() => callback(["new", null])}
      >
        Start a local game
      </button>
      <a href={meta.source} target="_blank" className={styles.gameButtonLink}>
        Go to rules (external)
      </a>
    </div>
  );
};
