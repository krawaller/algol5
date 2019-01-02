import {Setup} from '../../types';
import { KriegUnit } from './_types';

const kriegSetup: Setup<KriegUnit> = {
  notfrozens: {
    "1": ["a4", "b4", "a3", "b3"],
    "2": ["c2", "c1", "d2", "d1"]
  }
};

export default kriegSetup;
