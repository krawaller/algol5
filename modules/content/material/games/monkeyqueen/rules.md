---
updated: 2020-12-04
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

Each player starts with a single {UNIT:group=queens} (queen), that during the game will give birth to a number of {UNIT:group=babies} (babies). The {UNIT:group=queens} both start with a _strength_ value of 20 (originally represented by stack height).

Players take turns to {CMND:name=move} their {UNIT:group=queens} or one of their {UNIT:group=babies}. Both unit types move and capture like a chess queen, with some additional rules:

- If a {UNIT:group=babies} makes a non-capture {CMND:name=move} it must end up closer to the enemy {UNIT:group=queens}
- When a {UNIT:group=queens} makes a non-capture {CMND:name=move} it leaves behind a new {UNIT:group=babies} and _strength_ drops by one
- If a {UNIT:group=queens} has a _strength_ of 2 it may not make a non-capture {CMND:name=move} (since that would turn it into a {UNIT:group=babies})

After {PLR:who=1} has made her first turn, {PLR:who=2} can choose between making her move or invoking the {CMND:name=pie} rule, swapping pieces with {PLR:who=1}.

Win by killing the opponent {UNIT:group=queens} or leaving her without a valid move!
