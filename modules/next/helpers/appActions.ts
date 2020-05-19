import { AppActions } from "../../ui/src/helpers/appActions";
import Router from "next/router";

export const appActions: AppActions = {
  navTo: (path: string) => Router.push(path),
  prefetch: (path: string) => {
    Router.prefetch(path);
  },
};
