import { AppActions, AlgolNavStep } from "../../../../types";
import { useMemo, SyntheticEvent } from "react";

type UseNavHandlerOpts = {
  actions: AppActions;
  step: AlgolNavStep;
};

export const useNavHandler = (opts: UseNavHandlerOpts) => {
  const { actions, step } = opts;
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
