import * as React from "react";
import { AlgolIcon } from "algol-types";
import classnames from "classnames";

import { hollows, solids } from "./Icon.shapes";
import { available, fills, iconBasic, selected, strokes } from "./Icon.styles";

//const { icon, normal, available, selected } = require("./Icon.css");

type IconProps = {
  /** Which type of piece it is */
  icon: AlgolIcon;
  /** Which player controls the piece */
  owner: 0 | 1 | 2;
  /** Current state of the icon (decides animation) */
  mode?: "normal" | "available" | "selected";
};

/**
 * A component to show a playing piece icon. Used by the Piece component.
 */
export const Icon: React.FunctionComponent<IconProps> = ({
  owner,
  icon,
  mode = "normal"
}) => {
  return (
    <div
      key={icon}
      className={classnames(iconBasic, {
        [available]: mode === "available",
        [selected]: mode === "selected"
      })}
    >
      <svg
        viewBox="0 150 300 300"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <g>
          <path
            key={icon + "_solid"}
            d={solids[icon]}
            style={{
              fill: fills[owner],
              transition: "fill 0.6s ease, stroke 0.6s ease"
            }}
          />
          <path
            key={icon + "_hollow"}
            d={hollows[icon]}
            style={{
              fill: strokes[owner],
              transition: "fill 0.6s ease, stroke 0.6s ease"
            }}
          />
        </g>
      </svg>
    </div>
  );
};
