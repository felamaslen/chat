/**
 * @file app/reduction.js
 * Sets up the application state at load time
 */

import { Record, fromJS, List } from 'immutable';

import {
} from './config';

export default new Record({
  appState: fromJS({
    app: {
      user: null
    },
    messages: []
  }),
  effects: List.of()
});

