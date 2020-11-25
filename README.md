# Chessicals

Welcome to the source code repo for the Chessicals app, published at https://chessicals.com/!

## Repo structure

This is a monorepo, although it doesn't use any monorepo tooling like Lerna and such. The modules live in the `modules` folder. Each module typically follows the following patterns:

- Each module has a defined responsibility
- They have their own `package.json` containing local dependencies
- They have a main body of source code in a `src` folder
- They expose a number of commands as npm scripts in the `package.json` file
- The source code for the commands live in a `commands` folder
- The commands include a `robot` command that runs all other relevant commands in proper order
- In many modules some commands create artifacts into a `dist` folder, which are then used by other modules

## This central "module"

This root folder has...

- global dependencies, and dependencies common to more than one module
- some useful central commands that will in turn use commands in the modules! To get started, use these in order:
  - `npm run installAll` will get all dependencies
  - `npm run robot` will execute `robot` in each module in the correct order, generating all artifacts
  - `npm run app` starts the Chessicals app at `http://localhost:3000`
- then there are useful commands while working on a game:
  - `npm run stub <newGameId>` will run the stub command in each module as needed
  - `npm run process <gameId> <process>` is a convenience command while working on a game
  - `npm run css` will ensure updates to a `.less` file is picked up by the app

## Module overview

- `games`: contains the definitions for all games, and tooling for working with them
- `logic`: responsible for generating source code from the definitions in `games`
- `battle`: contains logic common to all games, wraps the generated source from `logic` in an ergonomic API
- `content`: contains chessicals-flavoured markdown files and tooling for working with it
- `common`: the classic "utils" folder, contains lots of random stuff imported by the other modules
- `encoding`: contains code for serializing game states, board states, etc
- `local`: contains code for storing stuff locally (so `local` is the prime consumer of `encoding` code)
- `payloads`: a module with code to stitch together various payloads from generated artifacts for the app
- `graphics`: contains SVG definitions and tooling for working with it
- `types`: contains TS defs for the game definition language and surrounding structure
- `ui`: contains React components and a storybook to run them
- `next`: the NextJS code for the actual Chessicals app, which is just a thin wrapper using the components from `ui`
- `firebase`: contains all firebase code for login and online play, etc

See `README.md` in each module for more details!

## Other resources

To see the full flow from beginning to end in how to add a new game, check out the [Adding Can the Sardines to Chessicals](https://www.youtube.com/playlist?list=PL-CCrKYYRXY4yNTCPPIXAse4KxmAXYZxf) Youtube video series!
