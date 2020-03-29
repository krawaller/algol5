import React, {
  FunctionComponent,
  useMemo,
  useState,
  useCallback,
} from "react";
import css from "./ArticleViewer.cssProxy";
import { ArticleList } from "../ArticleList";
import { Markdown } from "../Markdown";
import { Button } from "../Button";

export interface ArticleViewerActions {
  prefetch: (url: string) => void;
  navTo: (url: string) => void;
}

type ArticleViewerProps = {
  actions: ArticleViewerActions;
  backButtonText: string;
  list: {
    id: string;
    title: string;
    blurb: string;
    slug: string;
    preloads: string[];
    thumbdata: string;
  }[];
  articles: Record<string, string>;
};

export const ArticleViewer: FunctionComponent<ArticleViewerProps> = props => {
  const { list, articles, actions, backButtonText } = props;
  const [currentId, setCurrentId] = useState<string | null>(null);
  const close = useCallback(() => setCurrentId(null), [setCurrentId]);
  const extendedActions = useMemo(
    () => ({
      ...actions,
      goToArticle: setCurrentId,
    }),
    [setCurrentId, actions]
  );
  return currentId ? (
    <>
      <Button onClick={close} text={backButtonText} />
      <hr />
      <Markdown html={articles[currentId]} actions={actions} />
    </>
  ) : (
    <ArticleList list={list} actions={extendedActions} />
  );
};
