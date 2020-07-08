import React, { FunctionComponent, useState, Fragment } from "react";
import css from "./NewLocalSession.cssProxy";
import {
  AlgolGameGraphics,
  AlgolMeta,
  AlgolErrorReporter,
  AlgolGameBlobAnon,
  AlgolVariantAnon,
} from "../../../../types";
import { Button } from "../Button";
import { SessionList } from "../SessionList";
import { ImportBattle } from "../ImportBattle";
import { Box } from "../Box";
import { VariantSelector } from "./NewLocalSession.VariantSelector";

export interface NewLocalSessionActions {
  newLocalBattle: (code: string) => void;
  loadLocalSession: (sessionId: string) => void;
  importSession: (str: string) => void;
  reportError: AlgolErrorReporter;
}

type NewLocalSessionProps = {
  graphics: AlgolGameGraphics;
  actions: NewLocalSessionActions;
  previousSessionId?: string | null;
  meta: AlgolMeta<AlgolGameBlobAnon>;
  variants: AlgolVariantAnon[];
};

export const NewLocalSession: FunctionComponent<NewLocalSessionProps> = props => {
  const { actions, meta, graphics, previousSessionId, variants } = props;
  const [variant, setVariant] = useState(variants[0].code);
  return (
    <div className={css.newLocalSession}>
      <div className={css.newLocalSessionTopInstruction}>
        Games are saved at turn end to the browser storage.
      </div>
      <Box title="New local session">
        <Fragment>
          {variants.length > 1 && (
            <Fragment>
              <VariantSelector
                variants={variants}
                current={variant}
                onSelect={setVariant}
              />
              <br />
            </Fragment>
          )}
          <Button
            big
            onClick={() => actions.newLocalBattle(variant)}
            text="Create"
          />
        </Fragment>
      </Box>
      {/* <div className={css.newLocalSessionDivider} />
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
      <div className={css.newLocalSessionDivider} />
      <Box title="Load previous session">
        <SessionList
          meta={meta}
          graphics={graphics}
          actions={actions}
          variants={variants}
        />
      </Box>
      <div className={css.newLocalSessionDivider} />
      <Box title="Import session">
        <ImportBattle actions={actions} />
      </Box>
    </div>
  );
};
