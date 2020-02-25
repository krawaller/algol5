Go with the Floe is played on a {DIM} board with the following setup:

{SETUP}

{PLR:who=1} controls 2 {UNIT:group=seals,who=1} (seals) and {PLR:who=2} controls 2 {UNIT:group=bears,who=2} (polar bears), which they take turns to {CMND:name=move}.

Both {UNIT:group=seals} and {UNIT:group=bears} can {CMND:name=move} like a chess queen but only up to 2 spaces, to a free square.

WIP - jumps?

Squares that they leave and pass through are destroyed, represented by {UNIT:group=holes,who=0} (holes). Destroyed squares can never be passed through.

Instead of making a {CMND:name=move}, {PLR:who=2} can have her {UNIT:group=bears,who=2} {CMND:name=eat} an adjacent {UNIT:group=seals,who=1}, which will destroy both the {UNIT:group=bears,who=2} and the {UNIT:group=seals,who=1}.

Game ends:

- {ENDGAME:name=safeseal}: If a {UNIT:group=seals} is in an unreachable spot, {PLR:who=1} wins
- {ENDGAME:name=sealseaten}: If both {UNIT:group=seals,who=1} are eaten, {PLR:who=2} wins
