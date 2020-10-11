---
updated: 2020-10-10
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

The {UNIT:group=bases} are _bases_ and are never moved or captured.

Each turn a player with perform one of these two commands:

- {CMND:name=insert} a new {UNIT:group=soldiers} onto an edge space, either empty or occupied by a friendly {UNIT:group=soldiers}. In case of the latter, the player must choose a direction to _push_ the blocking unit closer to the center, orthogonally or diagonally (so 3 possible directions). If there is another friendly {UNIT:group=soldiers} in that direction that too is pushed, and so on. Should there be an enemy {UNIT:group=soldiers} at the end of the line, that enemy is captured.
- {CMND:name=move} a {UNIT:group=soldiers} orthodiagonally adjacent to a friendly {UNIT:group=bases}, across any number of connected friendly {UNIT:group=soldiers}, to a square that's either empty or occupied by an enemy {UNIT:group=soldiers} who is then captured.

There are two ways to win:

- {ENDGAME:name=killed18}: kill 18 enemy {UNIT:group=soldiers}
- {ENDGAME:name=tookcenter}: have 5 {UNIT:group=soldiers} in the center, lasting through the enemy turn
