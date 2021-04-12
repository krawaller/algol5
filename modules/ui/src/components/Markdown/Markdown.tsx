import React, {
  FunctionComponent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useAppActions } from "../../contexts";
import css from "./Markdown.cssProxy";

type MarkdownProps = {
  html: string;
  dynamicContent?: Record<string, string>;
  dynamicActions?: Record<string, (e: Event) => void>;
};

const linksFinder = /data-algollink="[^"]+"/g;
const urlExtracter = /"([^"]+)"/;
const emptyObj = {};

export const Markdown: FunctionComponent<MarkdownProps> = props => {
  const actions = useAppActions();
  const { html, dynamicContent = emptyObj, dynamicActions = emptyObj } = props;
  const me = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (me.current) {
      for (const dynamicId in dynamicContent) {
        const elem = me.current.querySelector(`[data-dynamic-${dynamicId}]`);
        if (elem) {
          elem.innerHTML = dynamicContent[dynamicId];
        }
      }
    }
  }, [dynamicContent, me.current, html]);
  useEffect(() => {
    if (me.current) {
      for (const dynamicId in dynamicActions) {
        const elem = me.current.querySelector(`[data-dynamic-${dynamicId}]`);
        if (elem) {
          elem.addEventListener("click", dynamicActions[dynamicId]);
        }
      }
    }
    return () => {
      if (me.current) {
        for (const dynamicId in dynamicActions) {
          const elem = me.current.querySelector(`[data-dynamic-${dynamicId}]`);
          if (elem) {
            elem.removeEventListener("click", dynamicActions[dynamicId]);
          }
        }
      }
    };
  }, [dynamicActions, me.current, html]);
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
