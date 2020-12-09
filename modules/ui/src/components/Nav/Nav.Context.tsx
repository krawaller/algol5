import { createContext } from "react";

const defaultNavContext = {
  isFullNav: false,
  setFullNav: () => {},
};

export const navContext = createContext(defaultNavContext);

export const { Provider: NavProvider } = navContext;
