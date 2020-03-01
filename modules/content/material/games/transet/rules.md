---
updated: 2020-02-25
---

{GAME} is played on a {DIM} board with the following setup:

{SETUP}

Players take turn moving one of their units:

- {UNIT:group=pinets} {CMND:name=move} one orthogonal step towards the enemy base
- {UNIT:group=piokers} {CMND:name=move} one diagonal step towards the enemy base
- {UNIT:group=piases} can {CMND:name=move} like both of the above

All units can capture an opponent unit when moving, but must immediately place the captured piece on the opponent home row.

Instead of a regular {CMND:name=move}, a player can {CMND:name=swap} two of her pieces:

- move one piece west and another east, or vice versa
- move one piece north and another south, or vice versa

Captures cannot be done while swapping. When swapping, unit type doesn't matter.

Win by making a unit reach the opponent base!
