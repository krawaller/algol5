import React, { Fragment, useState } from "react";
import {
  useMyCurrentGameChallenges,
  useForeignCurrentGameChallenges,
} from "../../../../remote/utils/context";
import { useGameAPI } from "../../contexts";
import { AuthGuard } from "../AuthGuard";
import { Box } from "../Box";
import { ChallengeList } from "../ChallengeList";
import { VariantSelector } from "../VariantSelector";
import css from "./NewRemoteSession.cssProxy";

export const NewRemoteSession = () => {
  return <AuthGuard Content={Inner} />;
};

const Inner = () => {
  const myChallenges = useMyCurrentGameChallenges();
  const otherChallenges = useForeignCurrentGameChallenges();
  const api = useGameAPI();
  const filteredVariants = api.variants.filter(v => !v.hidden);
  const [variant, setVariant] = useState(filteredVariants[0].code);
  return (
    <Fragment>
      <div className={css.newRemoteSessionTopInstruction}>
        Online play not yet fully implemented!
      </div>
      <Box title="Issue challenge">
        <div className={css.newRemoteSessionForm}>
          <VariantSelector
            variants={filteredVariants}
            current={variant}
            onSelect={setVariant}
          />
        </div>
      </Box>
      <Box title="My challenges">
        <ChallengeList challenges={myChallenges} />
      </Box>
      <Box title="Challenges by others">
        <ChallengeList challenges={otherChallenges} />
      </Box>
    </Fragment>
  );
};
