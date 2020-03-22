import React, { FunctionComponent, CSSProperties, useMemo } from "react";
import classNames from "classnames";
import css from "./AspectRatioBox.cssProxy";

type AspectRatioBoxProps = {
  height: number;
  width: number;
  className?: string;
  styles?: CSSProperties;
};

export const AspectRatioBox: FunctionComponent<AspectRatioBoxProps> = props => {
  const { height, width, children, className, styles } = props;
  const ratio = width / height;
  const style = useMemo(
    () =>
      (({ "--aspect-ratio": ratio, ...styles } as unknown) as CSSProperties),
    [styles]
  );
  return (
    <div
      style={style}
      className={classNames(className, css.aspectRatioBox, {
        [css.aspectRatioBoxByHeight]: true,
        [css.aspectRatioBoxByWidth]: false,
      })}
    >
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
      {children}
    </div>
  );
};
