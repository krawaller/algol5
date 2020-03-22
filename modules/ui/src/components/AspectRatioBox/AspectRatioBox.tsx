import React, { FunctionComponent, CSSProperties, useMemo } from "react";
import classNames from "classnames";
import css from "./AspectRatioBox.cssProxy";
import useOrientation from "../../helpers/useOrientation";

type AspectRatioBoxProps = {
  height: number;
  width: number;
  className?: string;
  styles?: CSSProperties;
  strategy: "byWidth" | "byHeight" | "byOrientation";
};

export const AspectRatioBox: FunctionComponent<AspectRatioBoxProps> = props => {
  const { height, width, children, className, styles, strategy } = props;
  const orientation = useOrientation();
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
        [css.aspectRatioBoxByHeight]:
          strategy === "byHeight" ||
          (strategy === "byOrientation" && orientation === "landscape"),
        [css.aspectRatioBoxByWidth]:
          strategy === "byWidth" ||
          (strategy === "byOrientation" && orientation === "portrait"),
      })}
    >
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
      {children}
    </div>
  );
};
