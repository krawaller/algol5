import retemplate from './helpers/retemplate';

import lib from '../dist/lib';

for (const gameId in lib) {
  retemplate(gameId);
}
