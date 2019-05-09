import * as React from "react";
import { Mark } from "../Mark";
import { AlgolUnitState, AlgolPosition } from "../../../types";

type BoardMarksProps = {
  units: { [id: string]: AlgolUnitState };
  marks: AlgolPosition[];
  potentialMarks: AlgolPosition[];
  callback: (pos: string) => void;
  height: number;
  width: number;
};

export const BoardMarks: React.FunctionComponent<BoardMarksProps> = ({
  marks,
  potentialMarks,
  units,
  callback,
  height,
  width
}) => {
  const unitsByPos = Object.keys(units).reduce(
    (mem, id) => ({
      ...mem,
      [units[id].pos]: units[id]
    }),
    {}
  );
  return (
    <React.Fragment>
      {marks
        .map(pos => [pos, true])
        .concat(potentialMarks.map(pos => [pos, false]))
        .map(([pos, selected]: [string, boolean]) => (
          <Mark
            key={pos}
            callback={callback}
            pos={pos}
            potential={!selected}
            height={height}
            width={width}
            piece={!!unitsByPos[pos]}
          />
        ))}
    </React.Fragment>
  );
};
