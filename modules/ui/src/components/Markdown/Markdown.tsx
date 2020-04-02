import React, {
  FunctionComponent,
  MouseEvent,
  useCallback,
  useEffect,
} from "react";
import css from "./Markdown.cssProxy";

export interface MarkdownActions {
  navTo: (path: string) => void;
  prefetch: (path: string) => void;
}

type MarkdownProps = {
  actions: MarkdownActions;
  html: string;
};

const linksFinder = /data-algollink="[^"]+"/g;
const urlExtracter = /"([^"]+)"/;

export const Markdown: FunctionComponent<MarkdownProps> = props => {
  const { actions, html } = props;
  useEffect(() => {
    if (html && html.match) {
      for (const hit of html.match(linksFinder) || []) {
        const [, url] = hit.match(urlExtracter) || [];
        if (url) {
          actions.prefetch(url);
        }
      }
    }
  }, [html, actions.prefetch]);
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.target) {
        const node = e.target as HTMLDivElement;
        const { algollink } = node.dataset;
        if (algollink) {
          e.preventDefault();
          actions.navTo(algollink);
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
