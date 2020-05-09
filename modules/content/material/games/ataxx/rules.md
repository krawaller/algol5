---
updated: 2020-05-08
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

Players take turn to act with their {UNIT}, doing one of two things:

- {CMND:name=jump} to an empty square two steps away (allowing diagonals)
- {CMND:name=split} by spawning a new {UNIT} in an empty adjacent square

In both cases, after acting, all enemy {UNIT} adjacent to the target square are taken over by the acting player.

When the board is full, the player with the most {UNIT} wins!

<div class="md-example">
  To the left {PLR:who=1} is pondering whether to make {UNIT:at=a1,who=1} {CMND:name=split} to {POS:at=b1} (middle) or {CMND:name=jump} to {POS:at=c2} (right).
  <div class="md-3col">
    {ARR:name=example1before,from=a1,to=d3}
    {ARR:name=example1split,from=a1,to=d3}
    {ARR:name=example1jump,from=a1,to=d3}
  </div>
  Both options have drawbacks; the {CMND:name=jump} gives up the corner, but the {CMND:name=split} leaves {PLR:who=2} with the last remaining empty square in this region. Here, the {CMND:name=jump} is likely the better move.
</div>
