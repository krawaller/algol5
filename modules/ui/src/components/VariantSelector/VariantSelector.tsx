import React, { FunctionComponent, useMemo } from "react";
import { AlgolVariantAnon } from "../../../../types";
import { RadioSelector } from "../RadioSelector";

type VariantSelectorProps = {
  onSelect: (v: string) => void;
  variants: AlgolVariantAnon[];
  current: string;
};

export const VariantSelector: FunctionComponent<VariantSelectorProps> = props => {
  const { onSelect, variants, current } = props;
  const opts = useMemo(
    () => variants.map(v => ({ value: v.code, desc: v.desc })),
    [variants]
  );
  return (
    <RadioSelector
      options={opts}
      onSelect={onSelect}
      value={current}
      group="variant"
    />
  );
};
