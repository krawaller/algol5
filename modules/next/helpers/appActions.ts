import Router from "next/router";

const ref = { last: "" };

export const appActions = {
  navTo: path => {
    const global = (typeof window === "undefined" ? {} : window) as Window &
      typeof globalThis & { ga: (a1: string, a2: string, a3?: string) => void };
    Router.push(path);
    if (global.ga && ref.last !== path) {
      global.ga("set", "page", path);
      global.ga("send", "pageview");
      ref.last = path;
    }
  },
  replace: path => Router.replace(path),
  prefetch: path => {
    Router.prefetch(path);
  },
  back: () => Router.back(),
};
