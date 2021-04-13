import Router from "next/router";
import { createContext, useContext } from "react";

export const RouterContext = createContext(Router.router);

export const useRouter = () => {
  return useContext(RouterContext);
};
