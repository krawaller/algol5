import { AlgolNavStep } from "../../../../types";
import { useAppActions } from "../../contexts";
import { useMemo, SyntheticEvent } from "react";

type UseNavHandlerOpts = {
  step: AlgolNavStep;
};

export const useNavHandler = (opts: UseNavHandlerOpts) => {
  const { step } = opts;
  const actions = useAppActions();
  const { url, onClick } = step;
  return useMemo(
    () =>
      onClick
        ? onClick
        : url
        ? (e: SyntheticEvent) => {
            e && e.preventDefault();
            actions.navTo(url);
          }
        : () => {},
    [url, onClick, actions.navTo]
  );
};
