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
      <fieldset>
        <legend>New local session</legend>
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
        <Button onClick={() => actions.newLocalBattle(variant)} text="Create" />
      </fieldset>
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
      <fieldset>
        <legend>Load previous session</legend>
        <SessionList
          meta={meta}
          graphics={graphics}
          actions={actions}
          variants={variants}
        />
      </fieldset>
      <div className={css.newLocalSessionDivider} />
      <fieldset>
        <legend>Import session</legend>
        <ImportBattle actions={actions} />
      </fieldset>
    </div>
  );
};
