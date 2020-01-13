import React, { FunctionComponent, useState } from "react";
import { InputButton } from "../InputButton";

interface ImportBattleActions {
  import: (str: string) => void;
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
      value={field}
      onValue={setField}
      buttonDisabled={!field}
    >
      Import
    </InputButton>
  );
};
