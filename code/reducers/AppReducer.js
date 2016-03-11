/**
 * @file code/reducers/AppReducer.js
 * Top level reducers
 */

import {
} from '../config';

export const doSomething = (reduction, thing) => {
  return reduction.setIn(['appState', 'app', 'thing'], thing);
}

