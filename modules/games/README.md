# Games module

This module houses the definitions for all games, and tooling to work with them.

The only `robot` command in this module is `npm run export`, which will fill `dist` with lots of useful aggregates for other modules to use when they want to access the game definitions.

For working on games there are a bunch of commands:

- `npm run stub <gameId>` will create stub files for a new game
- `npm run analyze <gameId>` will update generated TS types for a game. Typically you want to run this whenever you change any file in a game definition
- `npm run watch <gameId>` starts a process that will automatically call `npm run analyze <gameId>` when a file is changed

There are more commands, but they are more peripheral.
