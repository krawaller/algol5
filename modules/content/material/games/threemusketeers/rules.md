Three Musketeers is played on a {DIM} board with the following setup:

{SETUP}

{PLR:who=1} can {CMND} a {UNIT:group=kings,who=1} one orthogonal step to any square occupied by an enemy {UNIT:group=pawns,who=2}, which is captured. The {UNIT:group=kings,who=1} cannot move to an empty square.

{PLR:who=2} can {CMND} a {UNIT:group=kings,who=1} one orthogonal step to a vacant square.

The game can end in two ways:

- {ENDGAME:name=musketeersinline}: If all 3 {UNIT:group=kings,who=1} are in the same row or column, {PLR:who=2} wins
- {ENDGAME:name=strandedmusketeers}: If {PLR:who=1} has no valid moves, she wins
