import { useReducer, useMemo } from "react";
import {
  AlgolStaticGameAPI,
  AlgolBattle,
  AlgolLocalBattle,
} from "../../../../types";
import {
  newSessionFromBattle,
  updateSession,
  writeSession,
  session2battle,
  deleteSession,
} from "../../../../local/src";

type BattleAction =
  | "mark"
  | "command"
  | "endTurn"
  | "undo"
  | "toFrame"
  | "gamelobby"
  | "battlelobby"
  | "history"
  | "play"
  | "new"
  | "load";
type BattleCmnd = [BattleAction, any];

type BattleHookState = {
  battle: AlgolBattle | null;
  frame: number;
  session: AlgolLocalBattle | null;
  mode: "gamelobby" | "battlelobby" | "playing" | "history";
};

export function useBattle(api: AlgolStaticGameAPI) {
  const [state, dispatch] = useReducer(
    (state: BattleHookState, instr: BattleCmnd): BattleHookState => {
      const [cmnd, arg] = instr;
      if (cmnd === "toFrame") {
        // user chose a new frame in history view
        return {
          battle: state.battle,
          session: state.session,
          frame: arg,
          mode: "history",
        };
      } else if (cmnd === "new") {
        // user started a new local battle! initiate it
        const battle = api.newBattle();
        return {
          battle,
          frame: -1,
          session: newSessionFromBattle(battle),
          mode: "battlelobby",
        };
      } else if (cmnd === "load") {
        // user chose a battle in the list of saved battles. we load it
        // and set it as current battle.
        const session: AlgolLocalBattle = arg;
        const battle = session2battle(session, api);
        return battle.gameEndedBy
          ? {
              battle,
              session,
              frame: battle.history.length - 1,
              mode: "history",
            }
          : {
              battle,
              session,
              frame: -1,
              mode: "battlelobby",
            };
      } else if (cmnd === "gamelobby") {
        return {
          ...state, // keep eventual battle and session, will allow for "continue" button
          mode: "gamelobby",
        };
      } else if (cmnd === "history") {
        const frame =
          typeof arg === "number" ? arg : state.battle!.history.length - 1;
        return {
          ...state,
          frame,
          mode: "history",
        };
      } else if (cmnd === "battlelobby") {
        return {
          ...state,
          mode: "battlelobby",
        };
      } else if (cmnd === "play") {
        return {
          ...state,
          mode: "playing",
        };
      } else {
        // action was mark, command or endTurn. passing it on to game API
        const battle = api.performAction(state.battle!, cmnd, instr[1]);
        const frame = battle.gameEndedBy ? battle.history.length - 1 : -1;
        let session = state.session;
        if (cmnd === "endTurn") {
          session = updateSession(battle, state.session!);
          writeSession(api.gameId, session);
        }
        return {
          frame,
          battle,
          session,
          mode: "playing",
        };
      }
    },
    // initial state is in the game lobby with nothing in memory.
    // (at which point useUi renders a demo)
    {
      battle: null,
      frame: -1,
      session: null,
      mode: "gamelobby",
    }
  );
  const actions = useMemo(
    () => ({
      mark: (pos: string) => dispatch(["mark", pos]),
      endTurn: () => dispatch(["endTurn", null]),
      command: (cmnd: string) => dispatch(["command", cmnd]),
      undo: () => dispatch(["undo", null]),
      new: () => dispatch(["new", null]),
      load: (session: AlgolLocalBattle) => dispatch(["load", session]),
      toFrame: (frame: number) => dispatch(["toFrame", frame]),
      toHistory: (atFrame?: number) => dispatch(["history", atFrame]),
      toGameLobby: () => dispatch(["gamelobby", null]),
      toBattleLobby: () => dispatch(["battlelobby", null]),
      toBattleControls: () => dispatch(["play", null]),
      deleteSession: (session: AlgolLocalBattle) => {
        deleteSession(api.gameId, session!.id);
        dispatch(["gamelobby", null]);
      },
    }),
    []
  );
  return [state, actions] as const;
}
