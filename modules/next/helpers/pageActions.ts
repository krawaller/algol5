import Router from "next/router";

export const pageActions = {
  navTo: (path: string) => Router.push(path),
  prefetch: (path: string) => {
    Router.prefetch(path);
  },
};
