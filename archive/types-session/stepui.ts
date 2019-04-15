import { PositionList, Coords, Content } from "../";

export type StepUI = {
  playing: 0 | 1 | 2; // Can be 0 for start setup
  marks: PositionList;
  units: {
    [id: string]: {
      icon: string;
      coords: Coords;
      spawnCoords?: Coords;
    };
  };
  turn: number;
  description?: Content;
  idx?: number;
  stepIdx?: number;
  maxStepIdx?: number;
};
