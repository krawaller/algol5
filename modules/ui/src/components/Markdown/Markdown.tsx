import React, { FunctionComponent, useRef, useEffect, MouseEvent } from "react";
import css from "./Markdown.cssProxy";

export interface MarkdownActions {
  navigateTo: (path: string) => void;
}

type MarkdownProps = {
  actions: MarkdownActions;
  html: string;
};

export const Markdown: FunctionComponent<MarkdownProps> = props => {
  const { actions, html } = props;
  const listenersRegistered = useRef<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current && !listenersRegistered) {
      const listener = (e: Event) => {
        if (e.target) {
          const node = e.target as HTMLDivElement;
          const toGame = node.dataset.gameId;
          if (toGame) {
            e.preventDefault();
            actions.navigateTo(`/games/${toGame}`);
          }
        }
      };
      ref.current.addEventListener("click", listener);
      return () => {
        if (ref.current) {
          ref.current.removeEventListener("click", listener);
        }
      };
    }
  }, [listenersRegistered, ref.current, actions]);
  return (
    <div
      ref={ref}
      className={css.markdownContainer}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
