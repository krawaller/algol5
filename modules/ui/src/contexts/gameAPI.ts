import { createContext, useContext } from "react";
import { staticAPI } from "../../../battle/dist/apis/amazons/static";

export const GameAPIContext = createContext(staticAPI);

export const useGameAPI = () => {
  return useContext(GameAPIContext);
};
