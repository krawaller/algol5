---
updated: 2020-10-27
---

{GAME} is played on a {DIM} board with this setups:

{SETUP}

There are two types of units in {GAME}:

- A {UNIT:group=amazons} can move and shoot out a {UNIT:group=stones} of the same colour.
- A {UNIT:group=stones} will never move

On their turn a player will do two things in order:

1. First they {CMND:name=move} one of their {UNIT:group=amazons} orthodiagonally across any number of empty squares or pieces of the same colour
1. Now the moved {UNIT:group=amazons} will {CMND:name=fire} a {UNIT:group=stones} of the same colour across any number of empty squares or pieces of the same colour

On the very first turn of the game {PLR:who=1} will only {CMND:name=move} and not {CMND:name=fire}.

If your opponent is unable to {CMND:name=move} and {CMND:name=fire} in her turn, you win!

<div class="md-example">

The main difference between these rules and {GAME:id=amazons} is the ability to {CMND:name=move} and {CMND:name=fire} past units of the same colour.

This seemingly innocent change makes for a very different game!

</div>
