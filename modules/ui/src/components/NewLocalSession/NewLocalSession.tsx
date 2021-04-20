import React, { FunctionComponent, useState, Fragment } from "react";
import css from "./NewLocalSession.cssProxy";
import {
  AlgolGameGraphics,
  AlgolMeta,
  AlgolGameBlobAnon,
  AlgolVariantAnon,
} from "../../../../types";
import { Button } from "../Button";
import { SessionList } from "../SessionList";
import { ImportBattle } from "../ImportBattle";
import { Box } from "../Box";
import { VariantSelector } from "../VariantSelector";
import { useLocalBattleActions } from "../../contexts";

type NewLocalSessionProps = {
  graphics: AlgolGameGraphics;
  previousSessionId?: string | null;
  meta: AlgolMeta<AlgolGameBlobAnon>;
  variants: AlgolVariantAnon[];
};

export const NewLocalSession: FunctionComponent<NewLocalSessionProps> = props => {
  const { variants } = props;
  const localBattleActions = useLocalBattleActions();
  const filteredVariants = variants.filter(v => !v.hidden);
  const [variant, setVariant] = useState<string | number>(
    filteredVariants[0].code
  );
  return (
    <div className={css.newLocalSession}>
      <div className={css.newLocalSessionTopInstruction}>
        Games are saved at turn end to the browser storage.
      </div>
      <Box title="New local session">
        <Fragment>
          {filteredVariants.length > 1 && (
            <Fragment>
              <VariantSelector
                variants={filteredVariants}
                current={variant}
                onSelect={setVariant}
              />
              <br />
            </Fragment>
          )}
          <Button
            big
            onClick={() => localBattleActions.newLocalBattle(variant as string)}
            text="Create"
          />
        </Fragment>
      </Box>
      {/*
      <Button
        disabled={
          !previousSessionId && "No previous battle found for this game."
        }
        onClick={() =>
          previousSessionId && actions.loadLocalSession(previousSessionId)
        }
        controlId="continue-previous-battle"
        onError={actions.reportError}
      >
        Load last battle
      </Button> */}
      <Box title="Load previous session">
        <SessionList />
      </Box>
      <Box title="Import session">
        <ImportBattle />
      </Box>
    </div>
  );
};
