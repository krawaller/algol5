import React, { FunctionComponent } from "react";
import { AlgolErrorReporter, AlgolVariantAnon } from "../../../../types";
import { Button } from "../Button";
import { ButtonGroup } from "../ButtonGroup";

export interface VariantSelectorActions {
  newLocalBattle: (code: string) => void;
  reportError: AlgolErrorReporter;
}

type VariantSelectorProps = {
  actions: VariantSelectorActions;
  variants: AlgolVariantAnon[];
};

export const VariantSelector: FunctionComponent<VariantSelectorProps> = props => {
  const { actions, variants } = props;
  if (variants.length === 1) {
    return (
      <Button
        big
        onClick={() => actions.newLocalBattle(variants[0].code)}
        onError={actions.reportError}
        controlId="new-local-session-button"
      >
        New local session
      </Button>
    );
  }
  return (
    <ButtonGroup noBottomMargin>
      {variants.map((v, n) => (
        <Button
          key={v.code}
          big={n === 0}
          onClick={() => actions.newLocalBattle(v.code)}
          onError={actions.reportError}
          controlId="new-local-session-button"
        >
          {n
            ? v.desc[0].toUpperCase() + v.desc.slice(1)
            : `New ${v.desc} session`}
        </Button>
      ))}
    </ButtonGroup>
  );
};
