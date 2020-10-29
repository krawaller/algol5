---
updated: 2020-10-27
---

{GAME} is played on a {DIM} board with this setups:

{SETUP}

There are two types of units in {GAME}:

- A {UNIT:group=amazons} can move and shoot out a {UNIT:group=stones} of the same colour.
- A {UNIT:group=stones} will never move, but can be **flipped** to become the opponent colour.

On their turn a player will do two things in order:

1. First they {CMND:name=move} one of their {UNIT:group=amazons} orthodiagonally across any number of empty squares or pieces of the same colour
1. Now the moved {UNIT:group=amazons} will {CMND:name=fire} a {UNIT:group=stones} orthodiagonally in one of two ways:
   - across any number of empty squares or pieces of the same colour
   - across any number of enemy {UNIT:group=stones}, landing on an empty square behind them. This **flips** all the jumped {UNIT:group=stones}

On the very first turn of the game {PLR:who=1} will only {CMND:name=move} and not {CMND:name=fire}.

If your opponent is unable to {CMND:name=move} and {CMND:name=fire} in her turn, you win!

<div class="md-example">

Here {UNIT:group=amazons,who=1,at=a1} shoots out {UNIT:group=stones,who=1,at=d4} (left)...

<div class="md-2col">
{ARR:name=beforefiring,from=a1,to=d1}
{ARR:name=afterfiring,from=a1,to=d1}
</div>

...which captures {UNIT:group=stones,who=2,at=a2} and {UNIT:group=stones,who=2,at=a3} (right).

</div>
