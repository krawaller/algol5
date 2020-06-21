---
updated: 2020-06-21
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

On your turn you...

1. optionally {CMND:name=move} your {UNIT:group=kings} any number of orthogonal steps over empty squares. If you can reach the enemy {UNIT:group=kings} you must do so, and will immediately win.
1. {CMND:name=push} or {CMND:name=pull} an orthogonally adjacent {UNIT:group=stones,who=0} any number of steps over empty squares in a single direction.

There are two ways to win:

1. {ENDGAME:name=regicide} - kill the enemy {UNIT:group=kings}
1. {ENDGAME:name=starvation} - leave enemy unable to finish her next turn
