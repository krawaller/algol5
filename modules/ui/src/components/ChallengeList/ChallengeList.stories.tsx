import React from "react";
import { storiesOf } from "@storybook/react";

import { ChallengeList } from ".";
import {
  fakeChallengeByUser,
  fakeUserKurt,
  fakeUserRandy,
} from "../../../../remote/faker/mocks";

storiesOf("ChallengeList", module).add(
  "A common ChallengeList component",
  () => {
    const gameId = "amazons";
    const challenges = [
      fakeChallengeByUser({ gameId, user: fakeUserRandy }),
      fakeChallengeByUser({ gameId, user: fakeUserKurt }),
    ];
    return (
      <div style={{ padding: 10 }}>
        <ChallengeList challenges={challenges} user={fakeUserKurt} />
      </div>
    );
  }
);
