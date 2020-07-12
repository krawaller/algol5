---
updated: 2020-07-09
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

There are two types of units:

- A {UNIT:group=amazons} can move and shoot out a {UNIT:group=stones} of the same colour.
- A {UNIT:group=stones} will never move, but can be **flipped** to become the opponent colour.

On their turn a player will do two things in order:

1. First they {CMND:name=move} one of their {UNIT:group=amazons} orthogonally or diagonally across any number of empty squares (like a chess queen)
1. Now the moved {UNIT:group=amazons} will {CMND:name=fire} a {UNIT:group=stones} orthogonally or diagonally in one of two ways:
   - across any number of empty squares (just like in {GAME:id=amazons})
   - across any number of enemy {UNIT:group=stones}, landing on an empty square behind them. This **flips** all the jumped {UNIT:group=stones} (sort of like in Othello)

After your turn, if your opponent is unable to move, you get to move again.

The game ends when both players are unable to move, and the winner is the player controlling the most {UNIT:group=stones}!

<div class="md-example">

<div class="md-2col">
{ARR:name=beforefiring,from=a1,to=d1}
{ARR:name=afterfiring,from=a1,to=d1}
</div>

Here {UNIT:group=amazons,who=1,at=a1} shoots out {UNIT:group=stones,who=1,at=d1}...

...which captures {UNIT:group=stones,who=2,at=a2} and {UNIT:group=stones,who=2,at=a3}.

</div>