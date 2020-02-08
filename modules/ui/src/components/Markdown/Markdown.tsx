import React, { FunctionComponent, MouseEvent, useCallback } from "react";
import css from "./Markdown.cssProxy";

export interface MarkdownActions {
  navTo: (path: string) => void;
}

type MarkdownProps = {
  actions: MarkdownActions;
  html: string;
};

export const Markdown: FunctionComponent<MarkdownProps> = props => {
  const { actions, html } = props;
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.target) {
        const node = e.target as HTMLDivElement;
        const toGame = node.dataset.gameid;
        if (toGame) {
          e.preventDefault();
          actions.navTo(`/games/${toGame}`);
        }
      }
    },
    [actions]
  );
  return (
    <div
      onClick={handleClick}
      className={css.markdownContainer}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
