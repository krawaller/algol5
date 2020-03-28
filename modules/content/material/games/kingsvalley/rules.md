---
updated: 2020-03-28
---

{GAME} is played on using one of these boards and setups:

<div class="md-3col">
{SETUP:name=basic}
{SETUP:name=retrieve}
{SETUP:name=labyrinth,board=labyrinth}
</div>

From left to right, these are:

- <em>Regular</em> - the basic form of the game
- <em>Retrieve the king</em> - for experienced players, makes for a longer game
- <em>Labyrinth</em> - the evolved version published in 2014

In {GAME} players take turn to {CMND} one of their {UNIT:group=kings} or {UNIT:group=soldiers} as far as possible in any orthogonal or diagonal direction, until they hit...

- another unit
- the edge of the board
- a water square (if playing on the Labyrinth board)

Some limitations:

- You are never allowed to stop during a slide
- {UNIT:group=soldiers} are not allowed to stop at the central square (but they can pass through it)
- You may not move your {UNIT:group=kings} on the very first turn

After a {CMND}, you win the game if...

1. {ENDGAME:name=kinghome} - your {UNIT:group=kings} is on the central square
1. {ENDGAME:name=trappedenemy} - the enemy {UNIT:group=kings} cannot move in her next turn
