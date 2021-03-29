import React, { useState } from "react";
import { useRemoteAPI } from "../../../../remote/utils/context";
import { useGameAPI } from "../../contexts";
import { AsyncButton } from "../Button";
import { RadioSelector } from "../RadioSelector";
import { VariantSelector } from "../VariantSelector";

import css from "./NewRemoteSession.cssProxy";

const opts = [
  { value: 1, desc: "plr1" },
  { value: 2, desc: "plr2" },
  { value: 0, desc: "any" },
];

export const NewRemoteSessionForm = () => {
  const api = useGameAPI();
  const filteredVariants = api.variants.filter(v => !v.hidden);
  const [variant, setVariant] = useState(filteredVariants[0].code);
  const [opp, setOpp] = useState<string | number>(0);
  const remoteAPI = useRemoteAPI();
  const create = () => {
    return remoteAPI.challenge.createChallenge({
      lookingFor: opp as 0 | 1 | 2,
      gameId: api.gameId,
      variantCode: variant,
    });
  };
  return (
    <div className={css.newRemoteSessionForm}>
      <VariantSelector
        variants={filteredVariants}
        current={variant}
        onSelect={setVariant}
      />
      <RadioSelector
        onSelect={setOpp}
        value={opp}
        options={opts}
        group="opp"
        title="Opponent is"
      />
      <div>
        <AsyncButton onClick={create} text="Create" />
      </div>
    </div>
  );
};
