# Content module

This module contains Chessicals-flavoured markdown files for...

- news articles
  - create a new one by `npm run stubNews <newsId>`
  - recompile by `npm run stub writeNews <newsId>`
- about articles
  - create a new one by `npm run stubAbout <aboutId>`
  - recompile by `npm run stub writeAbout <aboutId>`
- tag articles
  - create a new one by `npm run stubTag <tagId>`
  - recompile by `npm run stub writeTag <tagId>`
- game info and rules pages
  - create via `npm run stubGame <gameId>`
  - recompile by `npm run stub writeGame <gameId>`
- various smaller content chunks

The compile commands above will put compiles html files in `dist`.

There's also some other surrounding tooling.
