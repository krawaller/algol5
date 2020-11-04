---
updated: 2020-10-24
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

Each player has 8 {UNIT}; Two starts on their home towers, and 6 remain off-board.

Every turn players have 3 action points that they can distribute among the following actions:

- {CMND:name=move} a {UNIT} orthogonally to an empty space
- {CMND:name=deploy} an off-board non-wounded {UNIT} to an empty home tower
- {CMND:name=heal} a _wounded_ off-board unit

If a {CMND:name=move} or {CMND:name=deploy} results in an opponent getting squeezed orthogonally between the the moved unit and a friend, that opponent is _wounded_ and taken off-board (custodian capture).

Win by occupying both enemy towers!
