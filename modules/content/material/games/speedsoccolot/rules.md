---
updated: 2020-05-04
---

{GAME} is played on a {DIM} (speed variant, shown left) or {DIM:board=original} (original variant, shown right) board:

<div class="md-2col">
{SETUP}
{SETUP:name=original,board=original}
</div>

Each turn players act with one of their {UNIT:group=players}, doing one of three things:

- {CMND:name=run} to an empty adjacent square
- If adjacent to {UNIT:group=ball,who=0} (the ball) they can:
  - {CMND:name=dribble}, which is the same as {CMND:name=run} except {UNIT:group=ball,who=0} also moves a step in the same direction
  - {CMND:name=kick} the ball any number of empty squares in a straight line away from the acting {UNIT:group=players}

Adjacency includes diagonals.

Win by getting {UNIT:group=ball,who=0} to the opponent home row (or lose by getting it into your own)!
