// Here you can define 'animations' to be applied when a command is executed.
// There are 3 types:
// - enterFrom: An object where keys and values are positions. A unit at a key position
//   will be animated as if coming from the corresponding value position
// - exitTo: Also an object of positions. A unit killed at a key position will be animated
//   as if fading out to the corresponding value position
// - ghost: A "temporary" unit entering from a square and exiting to another, then disappearing.
//   Useful for showing "shots", or the source of a change. You need to specify unit type and
//   owner for each ghost, as well as source and destination.

import { MurusgallicusadvancedAnim } from "./_types";

const murusgallicusadvancedAnim: MurusgallicusadvancedAnim = {
  sacrifice: [{ exitto: ["selecttower", "selectcrush"] }],
  crush: [{ ghost: ["selecttower", "selectcrush", "walls", ["player"]] }],
  move: [
    { enterin: ["madewalls", "selecttower"] },
    { ghosttoin: ["madetowers", "selecttower", "walls", ["player"]] },
    { ghosttoin: ["madecatapults", "selecttower", "walls", ["player"]] }
  ],
  fire: [
    {
      ifelse: [
        { noneat: ["oppunits", "selectfire"] },
        { enterfrom: ["selectfire", "selectcatapult"] },
        { ghost: ["selectcatapult", "selectfire", "walls", ["player"]] }
      ]
    }
  ]
};

export default murusgallicusadvancedAnim;
