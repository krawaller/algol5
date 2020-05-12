---
updated: 2020-05-10
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

Players take turn to perform one of two moves:

- {CMND:name=step}: Move a {UNIT:group=soldiers} to an empty adjacent space (including diagonals)
- {CMND:name=march}: Move an unbroken line of {UNIT:group=soldiers} (a "phalanx") up to X empty squares in any direction, where X is the length of the phalanx. The phalanx may end the move on top of an enemy {UNIT:group=soldiers} which is then killed, but this is only allowed if the enemy phalanx in the same direction is shorter.

(keen readers will notice that a {CMND:name=step} is really just a special case {CMND:name=march})

A {UNIT:group=soldiers} reaching the enemy base becomes a {UNIT:group=towers} and can no longer be moved or killed.

If after moving you have more {UNIT:group=towers} than your opponent, then your opponent must make a new {UNIT:group=towers} of her own in the next move. If she cannot, you win!
