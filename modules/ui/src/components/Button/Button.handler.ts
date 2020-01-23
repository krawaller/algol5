import { useMemo, MouseEvent } from "react";
import { preventDoubleTapZoom } from "./Button.preventDoubleTap";

export const useButtonClickHandler = (opts: {
  href?: string;
  disabled?: boolean | string;
  onClick: (e: MouseEvent) => void;
  onError?: (err: Error) => void;
}) => {
  const { href, disabled, onClick, onError } = opts;
  return useMemo(() => {
    if (href || disabled === true) {
      return preventDoubleTapZoom;
    }
    if (typeof disabled === "string") {
      return () => alert(disabled); // TODO - replace with Toaster action?
    }
    if (onError) {
      return (e: MouseEvent) => {
        preventDoubleTapZoom(e);
        try {
          onClick(e);
        } catch (err) {
          onError(err);
        }
      };
    }
    return (e: MouseEvent) => {
      preventDoubleTapZoom(e);
      onClick(e);
    };
  }, [href, disabled, onClick, onError]);
};
