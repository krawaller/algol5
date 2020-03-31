import { useMemo, MouseEvent } from "react";
import { preventDoubleTapZoom } from "../../helpers/preventDoubleTap";
import { AlgolError } from "../../../../types";

export const useButtonClickHandler = (opts: {
  disabled?: boolean | string;
  onClick: (e: MouseEvent) => void;
  onError?: (err: AlgolError) => void;
  controlId?: string;
}) => {
  const { disabled, onClick, onError, controlId } = opts;
  return useMemo(() => {
    if (disabled === true) {
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
  }, [disabled, onClick, onError, controlId]);
};
