import React, {
  FunctionComponent,
  useEffect,
  MouseEvent,
  useMemo,
} from "react";
import classNames from "classnames";
import css from "./Link.cssProxy";
import { Button } from "../Button";
import { useAppActions } from "../../contexts";

type LinkProps = {
  url: string;
  styleMode?: "asButton" | "asBigButton" | "link" | "none";
  text?: string;
};

export const Link: FunctionComponent<LinkProps> = props => {
  const { url, styleMode = "none", children, text } = props;
  const actions = useAppActions();
  const external = url[0] === "h";
  const handler = useMemo(
    () =>
      external
        ? undefined
        : (e: MouseEvent) => {
            e.preventDefault();
            actions.navTo(url);
          },
    [url, actions]
  );
  const body =
    styleMode === "asButton" || styleMode === "asBigButton" ? (
      <Button big={styleMode === "asBigButton"} text={text} onClick={handler}>
        {children}
      </Button>
    ) : (
      text || children
    );
  const classes = classNames({
    [css.link]: styleMode === "link",
    [css.linkNaked]:
      styleMode === "none" ||
      styleMode === "asButton" ||
      styleMode === "asBigButton",
  });
  // external link
  if (url[0] === "h") {
    return (
      <a className={classes} href={url} target="_blank">
        {body}
      </a>
    );
  }
  // internal link
  useEffect(() => actions.prefetch(url), []);
  return (
    <a onClick={handler} className={classes} href={url}>
      {body}
    </a>
  );
};
