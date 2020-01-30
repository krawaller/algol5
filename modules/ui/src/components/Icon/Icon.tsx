import * as React from "react";
import { AlgolIcon } from "../../../../types";
import { iconDataURIs } from "../../../../graphics/dist/iconDataURIs";
import classnames from "classnames";

import containerStyles from "./Icon.container.cssProxy";
import innerStyles from "./Icon.inner.cssProxy";

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
      className={classnames(containerStyles.iconContainer, {
        [containerStyles.iconContainerAvailable]: mode === "available",
        [containerStyles.iconContainerSelected]: mode === "selected",
      })}
    >
      <TransitionGroup>
        <Transition
          key={icon + owner}
          // exit time here should be in harmony with inner transition duration
          timeout={{ enter: 20, exit: 500 }}
        >
          {(status: TransitionStatus) => {
            if (status === "exited") {
              return null;
            }
            return (
              <div
                style={{
                  background: `url("${
                    iconDataURIs[(icon + owner) as keyof typeof iconDataURIs]
                  }")`,
                }}
                className={classnames(innerStyles.iconInner, {
                  [innerStyles.iconInnerDuringEnter]: status === "entering",
                  [innerStyles.iconInnerDuringExit]: status === "exiting",
                })}
              />
            );
          }}
        </Transition>
      </TransitionGroup>
    </div>
  );
};
