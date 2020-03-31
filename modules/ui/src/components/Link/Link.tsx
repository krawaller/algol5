import React, {
  FunctionComponent,
  useEffect,
  MouseEvent,
  useMemo,
} from "react";
import css from "./Link.cssProxy";
import { PageActions } from "../../helpers";
import { Button } from "../Button";

type LinkProps = {
  actions?: PageActions;
  url: string;
  asButton?: boolean;
  text?: string;
};

export const Link: FunctionComponent<LinkProps> = props => {
  const { actions, url, asButton, children, text } = props;
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
  const body = asButton ? (
    <Button text={text} onClick={handler}>
      {children}
    </Button>
  ) : (
    text || children
  );
  // external link
  if (url[0] === "h") {
    return (
      <a className={css.link} href={url} target="_blank">
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
    <a onClick={handler} className={css.link} href={url}>
      {body}
    </a>
  );
};
