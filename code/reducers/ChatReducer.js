/**
 * @file code/reducers/ChatReducer.js
 */

import { fromJS } from 'immutable';

import {
  createMessage
} from '../common';

import {
  API_CHAT_LIST_REQUEST
} from '../constants/effects';

import buildMessage from '../MessageBuilder';

export const requestChatList = reduction => {
  return reduction.set('effects', reduction.get('effects').push(buildMessage(
    API_CHAT_LIST_REQUEST, {}
  )));
}

export const insertChatList = (reduction, response) => {
  let chatList = reduction.getIn(['appState', 'chatList', 'list']);
  let messages = reduction.getIn(['appState', 'app', 'messages']);

  const badResponse = !response || !response.data || response.status !== 200;

  if (!badResponse) {
    chatList = fromJS(response.data);
  }
  else {
    messages = messages.push(createMessage('error', 'Error fetching list of users!', null));
  }

  return reduction
    .setIn(['appState', 'app', 'loadedChatList'], true)
    .setIn(['appState', 'chatList', 'list'], chatList)
    .setIn(['appState', 'chatList', 'selected'], -1)
    .setIn(['appState', 'app', 'messages'], messages)
  ;
}

