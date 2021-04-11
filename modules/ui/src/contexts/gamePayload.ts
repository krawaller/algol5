import { createContext, useContext } from "react";

import { payload } from "../../../payloads/dist/games/amazons";

export const GamePayloadContext = createContext(payload);

export const useGamePayload = () => {
  return useContext(GamePayloadContext);
};
