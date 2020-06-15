---
updated: 2020-06-15
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

Players take turn to {CMND:name=move} one of their {UNIT:group=runners}, through either...

- stepping to an adjacent empty space
- jumping over any number of units in a straight line into an empty space

Diagonals are allowed for both kinds of movement.

If you jump over oppent {UNIT:group=runners} you must {CMND:name=relocate} them to any empty square.

A {UNIT:group=runners} that reaches the enemy base turns into {UNIT:group=finishers} and can no longer be moved or jumped.

At the end of your turn, two conditions are checked:

- {ENDGAME:name=fullbase} If all squares in your home base are occupied, you lose!
- {ENDGAME:name=invasion} If all your {UNIT:group=runners} have turned into {UNIT:group=finishers}, you win!
