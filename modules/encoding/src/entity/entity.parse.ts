import { AlgolBoardEntity } from "../../../types";
import { codes, AlgolBoardEntityCode } from "./entity.codes";
import { coords2pos } from "../../../common";

export const parseEntities = (str: string): AlgolBoardEntity[] => {
  let x = 1;
  let y = 1;
  const ret: AlgolBoardEntity[] = [];
  const reprs = str.split("").map(c => codes[c]);
  let previous: AlgolBoardEntityCode | null = null;
  for (const code of reprs) {
    let pos = coords2pos({ x, y });
    switch (code[0]) {
      case "skip":
        x += code[1];
        break;
      case "row":
        y = code[1];
        x = 1;
        break;
      case "pot":
        ret.push(code2entity(code, pos));
        x += 1;
        break;
      case "mark":
        ret.push(code2entity(code, pos));
        x += 1;
        break;
      case "icon":
        ret.push(code2entity(code, pos));
        x += 1;
        break;
      case "repeat": {
        let remain = code[1];
        while (remain) {
          if (!previous) {
            throw new Error("Repeat code but no previous entity!");
          }
          ret.push(code2entity(previous, pos));
          x += 1;
          pos = coords2pos({ x, y });
          remain--;
        }
        break;
      }
    }
    previous = code;
  }
  return ret;
};

const code2entity = (
  code: AlgolBoardEntityCode,
  pos: string
): AlgolBoardEntity => {
  switch (code[0]) {
    case "icon":
      return {
        pos,
        ...(code[3] !== "none" && {
          mark: code[3],
        }),
        unit: {
          icon: code[1],
          owner: code[2],
        },
      };
    case "mark":
      return { mark: "mark", pos };
    case "pot":
      return { mark: "pot", pos };
    default:
      throw new Error("Code shouldnt be entity: " + code.toString());
  }
};
