---
updated: 2020-02-08
---

{GAME} is played on a {DIM} board with the following initial setup:

{SETUP}

There are three different unit types, each representing a stack height from the original game:

- {UNIT:group=walls} are height 1 stacks (walls). They cannot move or do anything.
- {UNIT:group=towers} are height 2 stacks (towers), which is the max height in the regular variant.
- {UNIT:group=catapults} are height 3 stacks (catapults), advanced variant only.

A {UNIT:group=towers} can...

- {CMND:name=move} by distributing itself into the two closest squares in any 1 direction. Target squares must be either empty or have a friendly {UNIT:group=walls}. Empty squares become {UNIT:group=walls}, and {UNIT:group=walls} become {UNIT:group=towers}. In the advanced variant {UNIT:group=towers} becomes {UNIT:group=catapults}.
- {CMND:name=crush} a neighbouring enemy {UNIT:group=walls} by reducing itself into a {UNIT:group=walls}. In the advanced variant you can also {CMND:name=crush} an enemy {UNIT:group=catapults} into a {UNIT:group=towers}.
- {CMND:name=sacrifice} itself by reducing a neighbouring enemy {UNIT:group=catapults} into a {UNIT:group=walls}.

The {UNIT:group=catapults} in the advanced variant can {CMND:name=fire} 2 or 3 squares in a non-backwards direction. The target square must be empty or contain an enemy. The following happens:

- The firing {UNIT:group=catapults} turns into a {UNIT:group=towers}.
- An empty target square becomes a friendly {UNIT:group=walls}.
- A hit enemy is reduced by 1 ({UNIT:group=catapults} -> {UNIT:group=towers} -> {UNIT:group=walls} -> killed).
