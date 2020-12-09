import React, { FunctionComponent, useState } from "react";
import { InputButton } from "../InputButton";
import { AlgolErrorReporter } from "../../../../types";

export type ImportBattleActions = {
  importSession: (str: string) => void;
  reportError: AlgolErrorReporter;
};

type ImportBattleProps = {
  actions: ImportBattleActions;
};

export const ImportBattle: FunctionComponent<ImportBattleProps> = props => {
  const { actions } = props;
  const [field, setField] = useState<string>("");
  return (
    <InputButton
      onClick={() => actions.importSession(field)}
      onEnter={() => actions.importSession(field)}
      onError={actions.reportError}
      value={field}
      onValue={setField}
      buttonDisabled={!field ? "Enter a savestring!" : false}
      placeholder="Enter savestring"
      controlId="import-seed-input-button"
    >
      Import
    </InputButton>
  );
};
