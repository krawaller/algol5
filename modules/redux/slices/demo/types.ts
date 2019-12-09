import { GameId } from "../../../games/dist/list";
import { AlgolArmy, AlgolAnimCompiled } from "../../../types";
import { Action } from "../../types";

export type DemoAction<Type extends string, Payload> = Action<
  Type,
  Payload,
  WithAlgolDemoState
>;

export type AlgolDemoState = {
  demos: Partial<{ [idx in GameId]: AlgolGameDemoState }>;
  playId?: number;
  speed?: number;
};

export type AlgolGameDemoState = {
  positions: AlgolArmy[];
  frame: number;
  anims: { [patchNum: string]: Partial<AlgolAnimCompiled> };
  playing?: boolean;
  playId?: number;
  speed?: number;
  inflated?: boolean;
};

export interface WithAlgolDemoState {
  demo: AlgolDemoState;
}
