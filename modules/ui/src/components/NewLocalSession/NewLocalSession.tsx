import React, { FunctionComponent } from "react";
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
  return (
    <div className={css.newLocalSession}>
      <VariantSelector variants={variants} actions={actions} />
      <div className={css.newLocalSessionDivider} />
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
      </Button>
      <div className={css.newLocalSessionDivider} />
      <Button disabled="AI is in the works, but remote play will be implemented first.">
        Versus AI
      </Button>
      <div className={css.newLocalSessionDivider} />
      <ImportBattle actions={actions} />
      <div className={css.newLocalSessionDivider} />
      <SessionList
        meta={meta}
        graphics={graphics}
        actions={actions}
        variants={variants}
      />
    </div>
  );
};
