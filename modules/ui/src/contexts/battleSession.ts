import { createContext, useContext } from "react";
import { useBattleActionsAndState } from "../components/GamePage/GamePage.useBattleActionsAndState";

export const BattleSessionContext = createContext<
  ReturnType<typeof useBattleActionsAndState>
>((null as unknown) as any);

export const useBattleSession = () => useContext(BattleSessionContext);
