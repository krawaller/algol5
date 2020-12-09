import React, {
  FunctionComponent,
  // useCallback
} from "react";
import {
  AlgolBattle,
  AlgolBattleSave,
  AlgolLocalBattle,
  AlgolMeta,
  AlgolGameBlobAnon,
} from "../../../../types";

// TODO - just showing import for now, can't make clipboard copying to work reliably :/

import css from "./ExportBattle.cssProxy";
import { stringifySeed } from "../../../../encoding/src/seed/seed.stringify";
// import { clipboardCopy } from "../../helpers";
import { Input } from "../Input";

type ExportBattleProps = {
  meta: AlgolMeta<AlgolGameBlobAnon>;
  battle: AlgolBattle;
  session: AlgolLocalBattle;
};

const noop = () => {};

export const ExportBattle: FunctionComponent<ExportBattleProps> = props => {
  const { meta, battle, session } = props;
  const save: AlgolBattleSave = {
    variantCode: battle.variant.code,
    ended: Boolean(session.endedBy),
    player: session.player,
    turn: session.turn,
    path: battle.path,
  };
  const str = stringifySeed(save, meta.id, 0);
  // const handleClick = useCallback(() => {
  //   clipboardCopy(str);
  //   alert("Copied to clipboard!");
  // }, [str]);
  return (
    <div>
      <div className={css.exportBattleInstruction}>
        Save the string below somewhere, and then you can import in later in a
        different browser!
      </div>
      <div className={css.exportBattleInputContainer}>
        <Input value={str} onChange={noop} />
        {/* <InputButton
          autoSelect
          value={str}
          onChange={noop}
          onClick={handleClick}
        >
          Copy
        </InputButton> */}
      </div>
    </div>
  );
};
