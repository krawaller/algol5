import { useMemo, MouseEvent } from "react";
import { preventDoubleTapZoom } from "./Button.preventDoubleTap";
import { AlgolError } from "../../../../types";

export const useButtonClickHandler = (opts: {
  href?: string;
  disabled?: boolean | string;
  onClick: (e: MouseEvent) => void;
  onError?: (err: AlgolError) => void;
  controlId?: string;
}) => {
  const { href, disabled, onClick, onError, controlId } = opts;
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
          const decError: AlgolError = err;
          decError.controlId = controlId; // watermark error with triggering control
          onError(decError);
        }
      };
    }
    return (e: MouseEvent) => {
      preventDoubleTapZoom(e);
      onClick(e);
    };
  }, [href, disabled, onClick, onError, controlId]);
};
