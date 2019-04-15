import { PositionList, Content } from "../";

export type StepControlUI = {
  potentialMarks: PositionList;
  instruction: Content;
  commands: {
    [cmndname: string]: string;
  };
  submit: "endTurn" | "win" | "draw" | "lose" | null;
  undo: string | null;
  turnStart: boolean;
  deadEnds: {
    [action: string]: true;
  };
};
