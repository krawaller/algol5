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
import { VariantSelector } from "../VariantSelector";

export type NewLocalSessionActions = {
  newLocalBattle: (code: string) => void;
  loadLocalSession: (sessionId: string) => void;
  importSession: (str: string) => void;
  reportError: AlgolErrorReporter;
};

type NewLocalSessionProps = {
  graphics: AlgolGameGraphics;
  actions: NewLocalSessionActions;
  previousSessionId?: string | null;
  meta: AlgolMeta<AlgolGameBlobAnon>;
  variants: AlgolVariantAnon[];
  corruptSessions: Record<string, string>;
};

export const NewLocalSession: FunctionComponent<NewLocalSessionProps> = props => {
  const { actions, meta, graphics, variants, corruptSessions } = props;
  const filteredVariants = variants.filter(v => !v.hidden);
  const [variant, setVariant] = useState(filteredVariants[0].code);
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
            onClick={() => actions.newLocalBattle(variant)}
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
        <SessionList
          meta={meta}
          graphics={graphics}
          actions={actions}
          variants={variants}
          corruptSessions={corruptSessions}
        />
      </Box>
      <Box title="Import session">
        <ImportBattle actions={actions} />
      </Box>
    </div>
  );
};
