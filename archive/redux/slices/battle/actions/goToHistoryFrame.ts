import { factory } from "../../../factory";

export type GoToHistoryFramePayload = {
  battleId: string;
  historyFrame: number;
};

export const [goToHistoryFrame, isGoToHistoryFrameAction] = factory({
  type: "BATTLE::GO_TO_HISTORY_FRAME",
  reducer: (
    draft,
    { battleId, historyFrame: frame }: GoToHistoryFramePayload
  ) => {
    draft.battles[battleId].historyFrame = frame;
  },
});
