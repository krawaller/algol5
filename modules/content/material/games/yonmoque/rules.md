---
updated: 2020-04-30
---

{GAME} is played on an initially empty {DIM} board with the following terrain:

{SETUP}

On their turn a player must do one of the following:

- {CMND:name=drop} one of their off-board 6 units onto an empty square
- {CMND:name=move} an on-board unit

How a unit moves depends on where it is on the board:

- A unit not on a square of its home colour is a {UNIT:group=pawns}. It can move one step in any direction to an empty square.
- A unit on a square of its home colour is a {UNIT:group=bishops}. It can move any number of steps diagonally, and a single step orthogonally, across empty squares.

After a {CMND:name=move} (and not a {CMND:name=drop}) you gain control of all enemy units on an unbroken line between the moved unit and another of your units (similar to Othello).

<div class="md-example">
{PLR:who=2} moves {UNIT:who=2,at=b1,group=bishops} to {POS:at=d3}, and thanks to {UNIT:who=2,at=a3,group=pawns} she captures {POS:at=b3} and {POS:at=c3}!
<div class="md-2col">
{ARR:name=capture_before,from=a1,to=e3}
{ARR:name=capture_after,from=a1,to=e3}
</div>
Nothing happens to {UNIT:who=1,at=d2,group=bishops} or {UNIT:who=1,at=e3,group=bishops} since they aren't caught between enemy units.
</div>

The game can end in three ways:

- {ENDGAME:name=fiveinarow} - If you make a line of 5 of your units, you lose
- {ENDGAME:name=fourinarow} - If through a {CMND:name=move} you make a new line of 4 of your units, you win
- {ENDGAME:name=starvation} - If your opponent cannot finish her next move, you win

<div class="md-example">
Thus the previous example was actually a winning move for {PLR:who=2}! But if {UNIT:who=1,at=e3,group=bishops} had been under {PLR:who=2} control, {PLR:who=1} would have won instead since then {PLR:who=2} would have made a line of 5.
</div>
