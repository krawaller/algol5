import React, { useCallback, useMemo, useState } from "react";
import { chunk as slackChunk } from "../../../../content/dist/chunks/slack/chunk";
import { chunk as newbieChunk } from "../../../../content/dist/chunks/newbie/chunk";
import { chunk as veteranChunk } from "../../../../content/dist/chunks/veteran/chunk";
import { useModal } from "../../helpers";
import { Modal } from "../Modal";
import { Markdown } from "../Markdown";
import { AppActions } from "../../../../types";
import { ButtonGroup } from "../ButtonGroup";
import { ButtonBar } from "../ButtonBar";
import { data, TitleData } from "../../../../payloads/dist/titleData";
import { ScrollBox } from "../ScrollBox";
import { getLatestSessionInfo } from "../../../../local/src";

const latestGame = data
  .slice(1)
  .filter(d => d.added !== "GENESIS")
  .sort((a: TitleData, b: TitleData) => (a.added > b.added ? -1 : 1))
  .slice(0)[0];

type TitlePageBodyProps = {
  actions: AppActions;
};

const buttonTexts = ["Hi, I'm new! 👋", "Hello again! 🤘"];

export const TitlePageBody = (props: TitlePageBodyProps) => {
  const { actions } = props;
  const startContentIndex = useMemo(
    () => (getLatestSessionInfo().gameId ? 1 : 0),
    []
  );
  const [contentIdx, setContentIdx] = useState(startContentIndex);
  const [isSlackModalOpen, openSlackModal, closeSlackModal] = useModal();
  const gotoLatest = useCallback(
    () => actions.navTo(`/games/${latestGame.slug}`),
    [actions]
  );
  const triggerSlack = useCallback(
    (e: Event) => {
      e.preventDefault();
      openSlackModal();
    },
    [openSlackModal]
  );
  const dynamicContent = useMemo(
    () => ({ latest: latestGame.name, slack: "join the Slack" }),
    []
  );
  const dynamicActions = useMemo(
    () => ({
      latest: gotoLatest,
      slack: triggerSlack,
    }),
    [gotoLatest, triggerSlack]
  );
  return (
    <ScrollBox>
      <ButtonGroup noBottomMargin>
        <ButtonBar
          texts={buttonTexts}
          onChange={setContentIdx}
          current={contentIdx}
        />
      </ButtonGroup>
      {contentIdx === 0 ? (
        <Markdown
          html={newbieChunk}
          actions={actions}
          dynamicContent={dynamicContent}
          dynamicActions={dynamicActions}
        />
      ) : (
        <Markdown
          html={veteranChunk}
          actions={actions}
          dynamicContent={dynamicContent}
          dynamicActions={dynamicActions}
        />
      )}
      <Modal
        isOpen={isSlackModalOpen}
        onClose={closeSlackModal}
        title="Chessicals Slack community"
      >
        <Markdown html={slackChunk} actions={actions} />
      </Modal>
    </ScrollBox>
  );
};
