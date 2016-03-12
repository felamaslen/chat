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
      loadingApp: 2
    },
    messages: [], // this is for displaying errors / alerts to the user
    chatList: {
      list: ['她', '他']
    },
    chat: {
      messages: [
        {
          uid: 1,
          name: 'Some Guy',
          text: 'Hello?',
          time: 1198179123
        },
        {
          uid: 2,
          name: 'Some Girl',
          text: 'Hey! :)',
          time: 1198179601
        }
      ]
    }
  }),
  effects: List.of()
});

