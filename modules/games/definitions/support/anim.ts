// Here you can define 'animations' to be applied when a command is executed.
// There are 3 types:
// - enterFrom: An object where keys and values are positions. A unit at a key position
//   will be animated as if coming from the corresponding value position
// - exitTo: Also an object of positions. A unit killed at a key position will be animated
//   as if fading out to the corresponding value position
// - ghost: A "temporary" unit entering from a square and exiting to another, then disappearing.
//   Useful for showing "shots", or the source of a change. You need to specify unit type and
//   owner for each ghost, as well as source and destination.

import { SupportDefinition } from "./_types";

const supportAnim: SupportDefinition["anim"] = {
  insert: [
    {
      enterfrom: [
        "selectedge",
        {
          offset: [
            "selectedge",
            {
              ifelse: [
                { same: [{ posx: "selectedge" }, 1] },
                7,
                {
                  ifelse: [
                    { same: [{ posx: "selectedge" }, 9] },
                    3,
                    { ifelse: [{ same: [{ posy: "selectedge" }, 1] }, 5, 1] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default supportAnim;
