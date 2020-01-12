import { useMemo, MouseEvent } from "react";
import { preventDoubleTapZoom } from "./Button.preventDoubleTap";

export const useButtonClickHandler = (opts: {
  href?: string;
  disabled?: boolean | string;
  onClick: (e: MouseEvent) => void;
}) => {
  const { href, disabled, onClick } = opts;
  return useMemo(
    () =>
      href || disabled === true
        ? preventDoubleTapZoom
        : typeof disabled === "string"
        ? () => alert(disabled)
        : (e: MouseEvent) => {
            onClick(e);
            preventDoubleTapZoom(e);
          },
    [href, disabled, onClick]
  );
};
