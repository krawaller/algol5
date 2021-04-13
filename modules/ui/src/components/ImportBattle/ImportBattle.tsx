import React, { useState } from "react";
import { InputButton } from "../InputButton";
import { useAppActions, useLocalBattleActions } from "../../contexts";

export const ImportBattle = () => {
  const [field, setField] = useState<string>("");
  const localBattleActions = useLocalBattleActions();
  const appActions = useAppActions();
  return (
    <InputButton
      onClick={() => localBattleActions.importSession(field)}
      onEnter={() => localBattleActions.importSession(field)}
      onError={appActions.reportError}
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
