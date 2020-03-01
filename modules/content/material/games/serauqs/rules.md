---
updated: 2020-02-29
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

As a first move players must {CMND:name=promote} one of their {UNIT:group=soldiers} to a {UNIT:group=wild}.

After that they take turn to {CMND:name=move} a {UNIT:group=soldiers} or {UNIT:group=wild} one step in any direction to an empty square.

They then immediately win if their units - optionally also including the opponent {UNIT:group=wild} - form any of these patterns:

- occupy all four corners
- occupy all four central squares
- have four units in a line, including diagonals but excluding starting row

<div class="md-example">

These examples are all a win for {PLR:who=2}:

<div class="md-3col">
{ARR:name=cornerwin}
{ARR:name=centerwin}
{ARR:name=linewin}
</div>

</div>
