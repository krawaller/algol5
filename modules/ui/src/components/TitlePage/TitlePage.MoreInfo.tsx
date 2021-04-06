import React, { useCallback, useMemo, useState, Fragment } from "react";
import { chunk as newbieChunk } from "../../../../content/dist/chunks/newbie/chunk";
import { chunk as veteranChunk } from "../../../../content/dist/chunks/veteran/chunk";
import { Markdown } from "../Markdown";
import { AppActions } from "../../contexts";
import { ButtonGroup } from "../ButtonGroup";
import { ButtonBar } from "../ButtonBar";
import { data, TitleData } from "../../../../payloads/dist/titleData";
import { getLatestSessionInfo } from "../../../../local/src";

const latestGame = data
  .slice(1)
  .filter(d => d.added !== "GENESIS")
  .sort((a: TitleData, b: TitleData) => (a.added > b.added ? -1 : 1))
  .slice(0)[0];

type TitleMoreInfoProps = {
  actions: AppActions;
};

const buttonTexts = ["Hi, I'm new! 👋", "Hello again! 🤘"];

export const TitleMoreInfo = (props: TitleMoreInfoProps) => {
  const { actions } = props;
  const startContentIndex = useMemo(
    () => (getLatestSessionInfo().gameId ? 1 : 0),
    []
  );
  const [contentIdx, setContentIdx] = useState(startContentIndex);
  const gotoLatest = useCallback(
    () => actions.navTo(`/games/${latestGame.slug}`),
    [actions]
  );
  const dynamicContent = useMemo(
    () => ({
      latest: latestGame.name,
      latestAdded: latestGame.added,
    }),
    []
  );
  const dynamicActions = useMemo(
    () => ({
      latest: gotoLatest,
    }),
    [gotoLatest]
  );
  return (
    <Fragment>
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
          dynamicContent={dynamicContent}
          dynamicActions={dynamicActions}
        />
      ) : (
        <Markdown
          html={veteranChunk}
          dynamicContent={dynamicContent}
          dynamicActions={dynamicActions}
        />
      )}
    </Fragment>
  );
};
