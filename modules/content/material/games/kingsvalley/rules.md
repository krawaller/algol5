---
updated: 2020-03-28
---

{GAME} is played on a {DIM} board with one of two setups:

<div class="md-2col">
{SETUP:name=basic}
{SETUP:name=retrieve}
</div>

The <em>regular</em> setup is shown to the left, and <em>retrieve</em> to the right. The <em>retrieve</em> setup will make for a longer game, and is aimed at experienced players.

In {GAME} players take turn to {CMND} one of their {UNIT:group=kings} or {UNIT:group=soldiers} (except you're not allowed to move your {UNIT:group=kings} the first turn).

Units {CMND} as far as possible in any orthogonal or diagonal direction, until they hit another unit or the edge of the board. You are not allowed to stop during a slide. Also, {UNIT:group=soldiers} are not allowed to stop at the central square.

After a {CMND}, you win the game if...

1. {ENDGAME:name=kinghome} - your {UNIT:group=kings} is on the central square
1. {ENDGAME:name=trappedenemy} - the enemy {UNIT:group=kings} cannot move in her next turn
