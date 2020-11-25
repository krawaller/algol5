# NextJS module

This module contains our NextJS code, which makes up the actual app!

Notably there's very little React code here, since the actual components live in the `ui` module.

There are commands to generate pages:

- `npm run makeGamePages`
- `npm run makeNewsPages`
- `npm run makeAboutPages`
- `npm run makeTagPages`

And `npm run getStatic` will collect CSS files and pictures as packages by the `ui` module.

To start the app, run `npm run dev`! This is the same command that is exposed as `npm run app` in the root module.

We can also deploy a built and exported NextJS app to `https://chessicals.com` via `npm run deploy`.
