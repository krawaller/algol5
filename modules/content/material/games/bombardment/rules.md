---
updated: 2020-07-13
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

Player take turn to make one of their {UNIT} do one of two things:

- {CMND:name=move} 1 orthogonal or diagonal step to an empty square closer to the enemy base
- {CMND:name=detonate}, killing all orthogonally and diagonally adjacent units

There are four possible endings:

- if you {CMND:name=move} into the opponent base, you win
- if you {CMND:name=detonate} and...
  - wipe out all units, the game is a draw
  - wipe out all enemies, you win
  - wipe out yourself, you lose
