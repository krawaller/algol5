{GAME} is played on a {DIM} board with the following initial setup:

{SETUP}

Each turn players {CMND} one of their {UNIT:group=notfrozens}, except the one they moved the previous turn. For ease of play that unit will be turned into a {UNIT:group=frozens}, so players always know which units are mobile.

A {UNIT:group=notfrozens} moves one step to an empty square. Moves are orthogonal except for entering/exiting the inner sanctums which can be done diagonally.

You win by:

- {ENDGAME:name=cornerinfiltration}: move a unit into the opponent inner sanctum
- {ENDGAME:name=occupation}: have two units on the ramparts around the opponent inner sanctum
- {ENDGAME:name=starvation}: leave the opponent without a legal move
