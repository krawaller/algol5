---
updated: 2020-10-29
---

{GAME} is played on a {DIM:board=basic}, {DIM:board=small} or {DIM:board=large} board with these setups:

<div class="md-3col">
{SETUP:name=basic,board=basic}
{SETUP:name=small,board=small}
{SETUP:name=large,board=large}
</div>

**NOTE**: the rules are in flux at this moment!

Regular variant shown to the left, small in the middle, large to the right.

There are two types of units in {GAME}:

- A {UNIT:group=amazons} can move and shoot out a {UNIT:group=stones} of the same colour.
- A {UNIT:group=stones} will never move, but can be **flipped** to become the opponent colour.

On their turn a player will do two things in order:

1. First they {CMND:name=move} one of their {UNIT:group=amazons} orthodiagonally across any number of empty squares (like a chess queen)
1. Now the moved {UNIT:group=amazons} will {CMND:name=fire} a {UNIT:group=stones} orthodiagonally in one of two ways:
   - across any number of empty squares (just like in {GAME:id=amazons}), but not onto an edge space!
   - across any number of enemy {UNIT:group=stones}, landing on an empty square behind them. This **flips** all the jumped {UNIT:group=stones} (sort of like in Othello)

On the very first turn of the game {PLR:who=1} will only {CMND:name=move} and not {CMND:name=fire}.

The game ends when a player is unable to move, and the winner is whoever has the most {UNIT:group=stones}!

<div class="md-example">

Here {UNIT:group=amazons,who=1,at=a1} shoots out {UNIT:group=stones,who=1,at=d4} (left)...

<div class="md-2col">
{ARR:name=beforefiring,from=a1,to=d1}
{ARR:name=afterfiring,from=a1,to=d1}
</div>

...which captures {UNIT:group=stones,who=2,at=a2} and {UNIT:group=stones,who=2,at=a3} (right).

</div>
