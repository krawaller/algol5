import React, { MouseEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Button, ButtonProps } from "./Button";
import css from "./Button.cssProxy";

type AsyncButtonProps = Omit<ButtonProps, "onClick"> & {
  onClick: (e: MouseEvent | void) => Promise<any>;
};

export const AsyncButton = (props: AsyncButtonProps) => {
  const { onClick, text, disabled, children, ...passOnProps } = props;
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);
  useEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );
  const handleClick = (e: MouseEvent) => {
    setLoading(true);
    onClick(e).finally(() => {
      if (mounted.current) {
        setLoading(false);
      }
    });
  };
  const content = text || children;
  return (
    <Button
      {...passOnProps}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      <span className={css.asyncButtonContent}>
        <span className={classNames(loading && css.asyncButtonHidden)}>
          {content}
        </span>
        <span className={classNames(!loading && css.asyncButtonMegaHidden)}>
          ...
        </span>
      </span>
    </Button>
  );
};
