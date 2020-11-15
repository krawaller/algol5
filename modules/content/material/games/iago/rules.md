---
updated: 2020-11-15
---

{GAME} is played on a {DIM:} with this setup:

{SETUP}

There are two types of units in {GAME}:

- A {UNIT:group=amazons} (amazon) can move and shoot out a {UNIT:group=stones} of the same colour.
- A {UNIT:group=stones} (stone) will never move, but can be **flipped** to become the opponent colour.

On their turn a player will do two things in order:

1. First they {CMND:name=move} one of their {UNIT:group=amazons} in an orthodiagonal line across squares either empty or occupied by own-coloured units
1. Now the moved {UNIT:group=amazons} will {CMND:name=fire} a {UNIT:group=stones} of the same colour, onto a square that the firing {UNIT:group=amazons} could reach with a subsequent move. After firing, **flip** all enemy {UNIT:group=stones} caught on a line between the fired stone and another unit of the current player's colour (just like after placement in Othello).

On the very first turn of the game {PLR:who=1} will only {CMND:name=move} and not {CMND:name=fire}.

The game ends when a player is unable to move, and the winner is whoever has the most {UNIT:group=stones}!
