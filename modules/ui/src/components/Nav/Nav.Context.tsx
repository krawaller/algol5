import { createContext } from "react";

const defaultNavContext = {
  isFullNav: false,
  setFullNav: (bool: boolean) => {
    console.log("Full nav set to", bool);
  },
};

export const navContext = createContext(defaultNavContext);

export const { Provider: NavProvider } = navContext;
