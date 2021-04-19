import { Atom, atom } from "klyva";
import { GameId } from "../../../games/dist/list";
import { LocalSessionGameState, LocalSessionState } from "./types";

export const sessionStateAtom = atom<LocalSessionState>({ perGame: {} });

export const gameAtoms: Partial<Record<
  GameId,
  Atom<LocalSessionGameState>
>> = {};
