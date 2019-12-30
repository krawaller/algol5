## Action overview

- `stepDemo` advances the frame of a single demo (if playing). Meant to be called by a ticker in a thunk
- `stepAllDemos` as above but for every demo (also looks at the individual playing vars).
- `startDemo` sets individual playing to true and gives it a playId
- `stopDemo` clears individual playing and playId
- `stopAllDemos` sets individual playing to false (but not playId?!)

## Thunk overview

- `playDemo`
  - `initDemo` if needed
  - `inflateDemo` if needed
  - `startDemo`
  - `tickDemo`
- `tickDemo`
  - `stepDemo` while playing and correct playId, looping
