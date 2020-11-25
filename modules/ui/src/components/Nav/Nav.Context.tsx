import { createContext } from "react";

const defaultNavContext = {
  isFullNav: false,
  setFullNav: (b: boolean) => {},
};

export const navContext = createContext(defaultNavContext);

export const { Provider: NavProvider } = navContext;
