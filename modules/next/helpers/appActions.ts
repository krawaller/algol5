import Router from "next/router";
import { AlgolEvent } from "../../types/page/events";

const global = (typeof window === "undefined" ? {} : window) as Window &
  typeof globalThis & { ga: (a1: string, a2: any) => void };

export const appActions = {
  navTo: path => {
    Router.push(path);
  },
  replace: path => {
    Router.replace(path);
  },
  prefetch: path => {
    Router.prefetch(path);
  },
  back: () => Router.back(),
  logEvent: (evt: AlgolEvent) => {
    if (global.ga) {
      global.ga("send", {
        hitType: "event",
        eventCategory: evt.category,
        eventAction: evt.action,
        eventLabel: evt.label,
      });
    }
  },
};
