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
      user: null,
      loadedUser: false,
      loadedChatList: false,
      loadingApp: 2,
      messages: [] // this is for displaying errors / alerts to the user
    },
    chatList: {
      list: [],
      selected: -1
    },
    chat: {
      messages: [
      ]
    }
  }),
  effects: List.of()
});

