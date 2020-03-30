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
        const { gameid, newsslug } = node.dataset;
        if (gameid) {
          e.preventDefault();
          actions.navTo(`/games/${gameid}`);
        } else if (newsslug) {
          e.preventDefault();
          actions.navTo(`/news/${newsslug}`);
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
