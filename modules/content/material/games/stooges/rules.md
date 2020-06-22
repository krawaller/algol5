---
updated: 2020-06-22
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

On your turn you choose between two possible actions:

- {CMND:name=move} one of your {UNIT:group=doubles} to an orthogonal or diagonal neighbour {UNIT:group=singles} of the same colour (making them trade positions).
- {CMND:name=swap} colour of a {UNIT:group=singles}. Some notes:
  - Usually you'll want to swap an opponent {UNIT:group=singles} into becoming your own, but the reverse is ok too.
  - You can't swap back the same {UNIT:group=singles} that your opponent just swapped
  - Two consecutive swaps are the max, after that you must {CMND:name=move}

Win by arranging your {UNIT:group=doubles} into a line! Diagonals included.
