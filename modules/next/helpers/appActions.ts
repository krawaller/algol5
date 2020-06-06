import Router from "next/router";

export const appActions = {
  navTo: path => Router.push(path),
  prefetch: path => {
    Router.prefetch(path);
  },
  back: () => Router.back(),
};
