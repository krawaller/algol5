import { createContext, useContext } from "react";
import { AlgolGamePayload } from "../../../types";

export const GamePayloadContext = createContext(
  (null as unknown) as AlgolGamePayload
);

export const useGamePayload = () => {
  return useContext(GamePayloadContext);
};

export const useGameAPI = () => {
  return useGamePayload().api;
};
