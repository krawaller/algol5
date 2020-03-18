import { useReducer, useMemo } from "react";
import {
  AlgolStaticGameAPI,
  AlgolBattle,
  AlgolLocalBattle,
  AlgolBattleSave,
  decorateError,
} from "../../../../types";
import {
  newSessionFromBattle,
  updateSession,
  writeSession,
  session2battle,
  deleteSession,
  forkSessionFromBattle,
  getLatestSessionId,
  getSessionById,
  setLatestSessionId,
} from "../../../../local/src";
import { parseSeed } from "../../../../encoding/src/seed";
import { importSessionFromBattle } from "../../../../local/src/session/importSessionFromBattle";

type BattleAction =
  | "mark"
  | "command"
  | "endTurn"
  | "undo"
  | "toFrame"
  | "gamelobby"
  | "battlelobby"
  | "battlehelp"
  | "history"
  | "play"
  | "new"
  | "load"
  | "deleteCurrentSession"
  | "fork"
  | "import"
  | "continuePreviousSession";
type BattleCmnd = [BattleAction, any];

type BattleHookState = {
  battle: AlgolBattle | null;
  frame: number;
  session: AlgolLocalBattle | null;
  mode: "gamelobby" | "battlelobby" | "playing" | "history" | "battlehelp";
  hasPrevious: boolean;
};

export function useBattle(api: AlgolStaticGameAPI) {
  const reducer = (
    state: BattleHookState,
    instr: BattleCmnd
  ): BattleHookState => {
    const [cmnd, arg] = instr;
    if (cmnd === "toFrame") {
      // user chose a new frame in history view
      return {
        battle: state.battle,
        session: state.session,
        frame: arg,
        mode: "history",
        hasPrevious: true,
      };
    } else if (cmnd === "new") {
      // user started a new local battle! initiate it
      const battle = api.newBattle(arg);
      const session = newSessionFromBattle(battle, api.iconMap);
      setLatestSessionId(api.gameId, session.id);
      return {
        battle,
        frame: -1,
        session,
        mode: "battlelobby", // could also go to "playing" here for less clicks, but this way battlelanding is introduced
        hasPrevious: true,
      };
    } else if (cmnd === "load") {
      // user chose a battle in the list of saved battles. we load it
      // and set it as current battle.
      const session: AlgolLocalBattle = arg;
      setLatestSessionId(api.gameId, session.id);
      const battle = session2battle(session, api);
      return battle.gameEndedBy
        ? {
            battle,
            session,
            frame: battle.history.length - 1,
            mode: "battlelobby", // could also go to "history" here
            hasPrevious: true,
          }
        : {
            battle,
            session,
            frame: -1,
            mode: "battlelobby", // could also go directly to "playing" here
            hasPrevious: true,
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
    } else if (cmnd === "battlehelp") {
      return {
        ...state,
        mode: "battlehelp",
      };
    } else if (cmnd === "deleteCurrentSession") {
      deleteSession(api.gameId, state.session!.id);
      return {
        battle: null,
        session: null,
        frame: 0,
        mode: "gamelobby",
        hasPrevious: false,
      };
    } else if (cmnd === "fork") {
      const historyFrame = state.battle!.history[state.frame];
      const battle = api.fromFrame(historyFrame, state.battle!.variant.code);
      const session = forkSessionFromBattle(battle, api.iconMap);
      setLatestSessionId(api.gameId, session.id);
      writeSession(api.gameId, session);
      return {
        battle,
        session,
        frame: 0,
        mode: "battlelobby",
        hasPrevious: true,
      };
    } else if (cmnd === "continuePreviousSession") {
      if (state.battle) {
        // still have a battle in memory, so just go back to that
        return {
          ...state,
          mode: "battlelobby",
        };
      } else {
        // load the last session from disk
        // (we know we have one since otherwise this cmnd wouldn't be available)
        const lastSessionId = getLatestSessionId(api.gameId)!;
        const session = getSessionById(api.gameId, lastSessionId);
        return reducer(state, ["load", session]);
      }
    } else if (cmnd === "import") {
      const save: AlgolBattleSave = arg;
      const battle = api.fromSave(save);
      const session = importSessionFromBattle(battle, api.iconMap);
      setLatestSessionId(api.gameId, session.id);
      writeSession(api.gameId, session);
      return {
        frame: -1,
        battle,
        session,
        mode: "battlelobby",
        hasPrevious: true,
      };
    } else {
      // action was mark, command or endTurn. passing it on to game API
      const battle = api.performAction(state.battle!, cmnd, instr[1]);
      const frame = battle.gameEndedBy ? battle.history.length - 1 : -1;
      let session = state.session;
      if (cmnd === "endTurn") {
        session = updateSession(battle, state.session!, api.iconMap);
        writeSession(api.gameId, session);
      }
      return {
        frame,
        battle,
        session,
        mode: "playing",
        hasPrevious: true,
      };
    }
  };
  const [state, dispatch] = useReducer(
    reducer,
    // initial state is in the game lobby with nothing in memory.
    // (at which point useUi renders a demo)
    {
      battle: null,
      frame: -1,
      session: null,
      mode: "gamelobby",
      hasPrevious: !!getLatestSessionId(api.gameId),
    }
  );
  const actions = useMemo(
    () => ({
      mark: (pos: string) => dispatch(["mark", pos]),
      endTurn: () => dispatch(["endTurn", null]),
      command: (cmnd: string) => dispatch(["command", cmnd]),
      undoBattleCommand: () => dispatch(["undo", null]),
      newLocalBattle: (code: string) => dispatch(["new", code]),
      loadLocalSession: (session: AlgolLocalBattle) =>
        dispatch(["load", session]),
      toFrame: (frame: number) => dispatch(["toFrame", frame]),
      toHistory: (atFrame?: number) => dispatch(["history", atFrame]),
      toBattleHelp: () => dispatch(["battlehelp", null]),
      toGameLobby: () => dispatch(["gamelobby", null]),
      toBattleLobby: () => dispatch(["battlelobby", null]),
      toBattleControls: () => dispatch(["play", null]),
      deleteCurrentSession: () => dispatch(["deleteCurrentSession", null]),
      forkSession: () => dispatch(["fork", null]),
      importSession: (str: string) => {
        const save = parseSeed(str, api.gameId);
        dispatch(["import", save]);
      },
      continuePreviousSession: () =>
        dispatch(["continuePreviousSession", null]),
    }),
    []
  );
  return [state, actions] as const;
}
