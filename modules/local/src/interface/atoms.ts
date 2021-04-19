import { Atom, atom } from "klyva";
import { GameId } from "../../../games/dist/list";
import { LocalSessionGameState, LocalSessionState } from "./types";

export const sessionStateAtom = atom(({} as unknown) as LocalSessionState);

export const gameAtoms = ({} as unknown) as Record<
  GameId,
  Atom<LocalSessionGameState>
>;
