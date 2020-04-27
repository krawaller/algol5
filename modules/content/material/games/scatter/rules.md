---
updated: 2020-04-27
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

Each turn a player can:

- {CMND:name=move} a {UNIT:group=pawns} 1 orthogonal step into an empty cell
- Shift the quadrant of {UNIT:group=nobles,who=0} into an orthogonally adjacent quadrant ({CMND:name=north}, {CMND:name=south}, {CMND:name=east} or {CMND:name=west}). Any units in the target quadrant are shifted into the quadrant vacated by the {UNIT:group=nobles,who=0}. You are not allowed to reverse an immediately previous shift.

If after moving you have {UNIT:group=pawns} in 8 different quadrants, you win!
