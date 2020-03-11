import React, { FunctionComponent } from "react";
import css from "./LocalSession.cssProxy";
import {
  AlgolLocalBattle,
  AlgolGameGraphics,
  AlgolMeta,
  AlgolErrorReporter,
  AlgolGameBlobAnon,
  AlgolVariantAnon,
} from "../../../../types";
import { Button } from "../Button";
import { SessionList } from "../SessionList";
import { ImportBattle } from "../ImportBattle";
import { VariantSelector } from "./LocalSession.VariantSelector";

export interface LocalSessionActions {
  newLocalBattle: (code: string) => void;
  loadLocalSession: (session: AlgolLocalBattle) => void;
  importSession: (str: string) => void;
  continuePreviousSession: () => void;
  reportError: AlgolErrorReporter;
}

type LocalSessionProps = {
  graphics: AlgolGameGraphics;
  actions: LocalSessionActions;
  hasPrevious: boolean;
  meta: AlgolMeta<AlgolGameBlobAnon>;
  variants: AlgolVariantAnon[];
};

export const LocalSession: FunctionComponent<LocalSessionProps> = props => {
  const { actions, meta, graphics, hasPrevious, variants } = props;
  return (
    <div className={css.localSession}>
      <VariantSelector variants={variants} actions={actions} />
      <div className={css.localSessionDivider} />
      <Button
        disabled={!hasPrevious && "No previous battle found for this game."}
        onClick={actions.continuePreviousSession}
        controlId="continue-previous-battle"
        onError={actions.reportError}
      >
        Load last battle
      </Button>
      <div className={css.localSessionDivider} />
      <Button disabled="AI is in the works, but remote play will be implemented first.">
        Versus AI
      </Button>
      <div className={css.localSessionDivider} />
      <ImportBattle actions={actions} />
      <div className={css.localSessionDivider} />
      <SessionList meta={meta} graphics={graphics} actions={actions} />
    </div>
  );
};
