import * as React from "react";
import { AlgolIcon } from "../../../types";
import classnames from "classnames";

import { hollows, solids } from "./Icon.shapes";
import {
  iconContainerAvailable,
  fills,
  iconContainerBasic,
  iconContainerSelected,
  iconInnerBasic,
  iconInnerDuringEnter,
  iconInnerDuringExit,
  iconInnerTransitionDuration,
  strokes,
} from "./Icon.styles";

import { TransitionGroup } from "react-transition-group";
import Transition, {
  TransitionStatus,
} from "react-transition-group/Transition";

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
      className={classnames(iconContainerBasic, {
        [iconContainerAvailable]: mode === "available",
        [iconContainerSelected]: mode === "selected",
      })}
    >
      <TransitionGroup>
        <Transition
          key={icon}
          timeout={{ enter: 20, exit: iconInnerTransitionDuration }}
        >
          {(status: TransitionStatus) => {
            if (status === "exited") {
              return null;
            }
            return (
              <svg
                viewBox="0 150 300 300"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  ...iconInnerBasic,
                  ...(status === "exiting" && iconInnerDuringExit),
                  ...(status === "entering" && iconInnerDuringEnter),
                }}
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
