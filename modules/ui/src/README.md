# UI module

This module contains all the React components, which are then used by the `next` module.

It also has a storybook, start by `npm run storybook`.

There's a range of commands to collect various static resources from around the various modules.

## CSS solution

We've experimented a fair bit, so things are a bit messy, apologies! Current setup is that...

- you typically create a CSS file inside a module folder
- you DON'T need to `import` that file in the component
- running `npm run harvestCss` will create a `.cssProxy.js` file for each CSS file, which exports an object with all classnames
- in the components you will import the classes from the proxy files
- the harvest command will also collect all CSS into a `dist/ui.css` file, which will then be used by the Storybook and the NextJS app
