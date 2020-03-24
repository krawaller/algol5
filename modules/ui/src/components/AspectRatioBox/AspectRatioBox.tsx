import React, { FunctionComponent, CSSProperties, useMemo } from "react";
import classNames from "classnames";
import css from "./AspectRatioBox.cssProxy";
import useOrientation from "../../helpers/useOrientation";
import useParentSize from "../../helpers/useParentSize";

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
  const [bbox, ref] = useParentSize();
  console.log("PARENT", bbox);
  const style = useMemo(() => {
    let height, width;
    if (
      strategy === "byHeight" ||
      (strategy === "byOrientation" && orientation === "landscape")
    ) {
      height = bbox.height;
      width = bbox.height * ratio;
    } else {
      height = bbox.width / ratio;
      width = bbox.width;
    }
    console.log("WOOP", strategy, bbox, height, width);
    return {
      ...styles,
      height,
      width,
    };
  }, [styles, bbox.height, bbox.width]);
  return (
    <div
      ref={ref}
      style={style}
      className={classNames(
        className,
        css.aspectRatioBox
        // {
        // [css.aspectRatioBoxByHeight]:
        //   strategy === "byHeight" ||
        //   (strategy === "byOrientation" && orientation === "landscape"),
        // [css.aspectRatioBoxByWidth]:
        //   strategy === "byWidth" ||
        //   (strategy === "byOrientation" && orientation === "portrait"),
        // }
      )}
    >
      {/* <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" /> */}
      {children}
    </div>
  );
};
