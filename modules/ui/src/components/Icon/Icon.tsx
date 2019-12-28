import * as React from "react";
import { AlgolIcon } from "../../../../types";
import classnames from "classnames";

import containerStyles from "./Icon.container.cssProxy";
import innerStyles from "./Icon.inner.cssProxy";

import { hollows, solids } from "./Icon.shapes";

import { TransitionGroup } from "react-transition-group";
import Transition, {
  TransitionStatus,
} from "react-transition-group/Transition";

export const fills = ["lightyellow", "lightpink", "lightsteelblue"];
export const strokes = ["orange", "darkred", "darkblue"];

type IconProps = {
  /** Which type of piece it is */
  icon: AlgolIcon;
  /** Which player controls the piece */
  owner: 0 | 1 | 2;
  /** Current state of the icon (decides animation) */
  mode?: "normal" | "available" | "selected";
};

/**
 * A component to show a playing piece icon. Used by the Piece component, and by Content showing unit types
 */
export const Icon: React.FunctionComponent<IconProps> = ({
  owner,
  icon,
  mode = "normal",
}) => {
  return (
    <div
      className={classnames(containerStyles.iconContainer, {
        [containerStyles.iconContainerAvailable]: mode === "available",
        [containerStyles.iconContainerSelected]: mode === "selected",
      })}
    >
      <TransitionGroup>
        <Transition
          key={icon}
          // exit time here should be in harmony with inner transition duration
          timeout={{ enter: 20, exit: 500 }}
        >
          {(status: TransitionStatus) => {
            if (status === "exited") {
              return null;
            }
            return (
              <svg
                viewBox="0 150 300 300"
                xmlns="http://www.w3.org/2000/svg"
                className={classnames(innerStyles.iconInner, {
                  [innerStyles.iconInnerDuringEnter]: status === "entering",
                  [innerStyles.iconInnerDuringExit]: status === "exiting",
                })}
              >
                <g>
                  <path
                    d={solids[icon]}
                    style={{
                      fill: fills[owner],
                      transition: "fill 0.6s ease, stroke 0.6s ease",
                    }}
                  />
                  <path
                    d={hollows[icon]}
                    style={{
                      fill: strokes[owner],
                      transition: "fill 0.6s ease, stroke 0.6s ease",
                    }}
                  />
                </g>
              </svg>
            );
          }}
        </Transition>
      </TransitionGroup>
    </div>
  );
};
