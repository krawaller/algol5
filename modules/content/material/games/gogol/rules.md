---
updated: 2020-03-05
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

For the first turn both players will {CMND:name=deploy} a {UNIT:group=kings} to any board square (that doesn't make a forbidden pattern, see below).

Players then take turn to {CMND:name=move} or {CMND:name=jump} with one of their units.

- A {UNIT:group=soldiers} moves to any free square
- A {UNIT:group=kings} moves like a chess queen to a free square

Both {UNIT:group=soldiers} and {UNIT:group=kings} can instead {CMND:name=jump} over an adjacent enemy to a free square behind it in order to capture it.

There are two win conditions:

- {ENDGAME:name=infiltration}: Get your {UNIT:group=kings} to the opponent base
- {ENDGAME:name=regicide}: Kill the opponent {UNIT:group=kings}

Players may never make any of the 3 forbidden patterns:

<div class="md-3col">
{ARR:name=homerow,from=d1,to=f3}
{ARR:name=secondrow,from=d1,to=f3}
{ARR:name=side,from=a3,to=c5}
</div>

From left to right:

- {UNIT:group=kings} next to friendly {UNIT:group=soldiers} iside home base
- {UNIT:group=kings} in front of home base with 3 friendly {UNIT:group=soldiers} behind
- {UNIT:group=kings} on left/right board edge next to friendly {UNIT:group=soldiers} in same column
