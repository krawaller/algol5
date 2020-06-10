import React, {
  FunctionComponent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
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
  const me = useRef<HTMLDivElement>(null);
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
  useEffect(() => {
    if (me.current) {
      for (const img of Array.from(
        me.current.querySelectorAll("[data-src]")
      ) as HTMLImageElement[]) {
        img.setAttribute("src", img.getAttribute("data-src")!);
        img.removeAttribute("data-src");
        if (img.complete) {
          img.parentElement!.classList.remove("md-img-with-placeholder");
        } else {
          img.addEventListener("load", () =>
            img.parentElement!.classList.remove("md-img-with-placeholder")
          );
        }
      }
    }
  }, [me.current, html]);
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
      ref={me}
      onClick={handleClick}
      className={css.markdownContainer}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
