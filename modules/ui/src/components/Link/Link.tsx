import React, {
  FunctionComponent,
  useEffect,
  MouseEvent,
  useMemo,
} from "react";
import classNames from "classnames";
import css from "./Link.cssProxy";
import { PageActions } from "../../helpers";
import { Button } from "../Button";

type LinkProps = {
  actions?: PageActions;
  url: string;
  styleMode?: "asButton" | "link" | "none";
  text?: string;
};

export const Link: FunctionComponent<LinkProps> = props => {
  const { actions, url, styleMode = "none", children, text } = props;
  const external = url[0] === "h";
  const handler = useMemo(
    () =>
      external
        ? undefined
        : (e: MouseEvent) => {
            e.preventDefault();
            actions!.navTo(url);
          },
    [url, actions]
  );
  const body =
    styleMode === "asButton" ? (
      <Button text={text} onClick={handler}>
        {children}
      </Button>
    ) : (
      text || children
    );
  const classes = classNames({
    [css.link]: styleMode === "link",
    [css.linkNaked]: styleMode === "none" || styleMode === "asButton",
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
  if (!actions) {
    throw new Error(`Internal link to ${url} didn't get actions!`);
  }
  useEffect(() => actions.prefetch(url), []);
  return (
    <a onClick={handler} className={classes} href={url}>
      {body}
    </a>
  );
};
