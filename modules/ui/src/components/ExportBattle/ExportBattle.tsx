import React, { FunctionComponent, useCallback } from "react";
import {
  AlgolBattle,
  AlgolBattleSave,
  AlgolLocalBattle,
  AlgolMeta,
} from "../../../../types";

import css from "./ExportBattle.cssProxy";
import { InputButton } from "../InputButton";
import { stringifySeed } from "../../../../encoding/seed/seed.stringify";

type ExportBattleProps = {
  meta: AlgolMeta<string, string>;
  battle: AlgolBattle;
  session: AlgolLocalBattle;
};

const noop = () => {};

export const ExportBattle: FunctionComponent<ExportBattleProps> = props => {
  const { meta, battle, session } = props;
  const save: AlgolBattleSave = {
    ended: Boolean(session.endedBy),
    player: session.player,
    turn: session.turn,
    path: battle.path,
  };
  const str = stringifySeed(save, meta.id, 0);
  const handleClick = useCallback(() => {
    alert("Copied to clipboard (or would have been if this was implemented)!");
  }, []);
  return (
    <div>
      <div className={css.exportBattleInstruction}>
        Save the string below to (soon) be able to import this {meta.name}{" "}
        session in another browser!
      </div>
      <div className={css.exportBattleInputContainer}>
        <InputButton
          autoSelect
          value={str}
          onChange={noop}
          onClick={handleClick}
        >
          Copy
        </InputButton>
      </div>
    </div>
  );
};
