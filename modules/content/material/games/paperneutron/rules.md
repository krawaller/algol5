---
updated: 2020-04-21
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

All units can {CMND} in 8 directions by moving as far as possible until they hit another unit or the board edge.

On their turn, players must first {CMND} the two neutral {UNIT:who=0}, and then one of their own {UNIT}.

Except for the very first turn where {PLR:who=1} just moves one of her own {UNIT:who=1}.

After completing all slides, you...

- lose by {ENDGAME:name=suicide} if you had to {CMND} a {UNIT:who=0} into the opponent base
- win by {ENDGAME:name=goal} if you manage to {CMND} a {UNIT:who=0} into your own base
