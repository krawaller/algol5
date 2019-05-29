import { GameId } from "../../../games/dist/list";
import { AlgolArmy, AlgolAnimCompiled } from "../../../types";
import { ReducingAction } from "../../types";

export enum DemoActionName {
  INIT_DEMO = "DEMO::INIT_DEMO"
}

export type DemoAction<Type, Payload> = ReducingAction<
  Type,
  Payload,
  WithAlgolDemoState
>;

export type AlgolDemoState = {
  demos: Partial<{ [idx in GameId]: AlgolGameDemoState }>;
};

type AlgolGameDemoState = {
  positions: AlgolArmy[];
  frame: number;
  anims: { [patchNum: string]: Partial<AlgolAnimCompiled> };
  playing?: boolean;
  inflated?: boolean;
};

export interface WithAlgolDemoState {
  demo: AlgolDemoState;
}
