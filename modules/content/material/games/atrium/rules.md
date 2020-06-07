---
updated: 2020-06-07
---

{GAME} is played on a {DIM} board with the following starting setup:

{SETUP}

Each turn players {CMND} one of their {UNIT:group=kings} or {UNIT:group=queens} one orthogonal step. Blocking units are pushed out of the way, if there is a free square for them to move into.

After moving the following checks are made:

- {ENDGAME:name=winline} - if you have an orthogonal or diagonal 3-in-a-row of all three units of a single type, you win!
- {ENDGAME:name=loseline} - otherwise, if you happened to create such a line for your opponent, you lose!
