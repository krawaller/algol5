import React, { FunctionComponent, useState } from "react";
import { InputButton } from "../InputButton";
import { AlgolError } from "../../../../types";

export interface ImportBattleActions {
  import: (str: string) => void;
  error: (err: AlgolError) => void;
}

type ImportBattleProps = {
  actions: ImportBattleActions;
};

export const ImportBattle: FunctionComponent<ImportBattleProps> = props => {
  const { actions } = props;
  const [field, setField] = useState<string>("");
  return (
    <InputButton
      onClick={() => actions.import(field)}
      onEnter={() => actions.import(field)}
      onError={actions.error}
      value={field}
      onValue={setField}
      buttonDisabled={!field ? "Enter a savestring!" : false}
      placeholder="Enter savestring"
    >
      Import
    </InputButton>
  );
};
