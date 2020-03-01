---
updated: 2020-02-29
---

{GAME} is played on an inially empty {DIM} board.

Each turn a player does one of the following:

- {CMND:name=deploy} a {UNIT:group=pawns,who=0} to an empty square
- {CMND:name=promote} a {UNIT:group=pawns,who=0} to a {UNIT:group=bishops,who=0}
- {CMND:name=promote} a {UNIT:group=bishops,who=0} to a {UNIT:group=kings,who=0}

If this makes 3 of the same units in a line (including diagonals), the player wins!
