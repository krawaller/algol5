---
updated: 2020-05-17
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

There are 5 unit types in the game:

- Orthogonal knight {UNIT:group=knightortho}, move like chess rook
- Diagonal knight {UNIT:group=knightdiag}, move like chess bishop
- Unpromoted leader {UNIT:group=leader}, move like chess king
- Orthogonal leader {UNIT:group=leaderortho}, move like king or rook
- Diagonal leader {UNIT:group=leaderdiag}, move like king or bishop

All pieces capture by replacement, like in chess.

Players take turn to either:

- Drop one of their 3 off-board knights on an empty square in the castle by their throne, as either {CMND:name=orthogonal} {UNIT:group=knightortho} or {CMND:name=diagonal} {UNIT:group=knightdiag}
- {CMND:name=step} with unpromoted leader {UNIT:group=leader}. If reaches grass field, promote to {CMND:name=orthogonal} {UNIT:group=leaderortho} or {CMND:name=diagonal} {UNIT:group=leaderdiag}
- Move knight or promoted leader, afterwards selecting {CMND:name=orthogonal} or {CMND:name=diagonal} orientation for next turn

There are two win conditions:

- {ENDGAME:name=regicide} - Kill the enemy leader
- {ENDGAME:name=infiltration} - Move your leader to enemy throne
