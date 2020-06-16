---
updated: 2020-05-04
---

{GAME} is played on an initially empty {DIM} board.

For their first turn players will each {CMND:name=deploy} a {UNIT:group=knights} anywhere on the board (except {PLR:who=1} may not use the 4 central squares).

Then they will take turns to {CMND:name=jump} their {UNIT:group=knights} like chess knights onto an empty square, spawning a {UNIT:group=marks} in the vacated square.

Win by:

- {ENDGAME:name=winline}: Form a line in any direction of 4 or more {UNIT:group=marks}
- {ENDGAME:name=starvation}: Block in the opponent {UNIT:group=knights}
