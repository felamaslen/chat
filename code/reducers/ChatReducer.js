/**
 * @file code/reducers/ChatReducer.js
 */

import { List, fromJS } from 'immutable';

import {
  createMessage
} from '../common';

import {
  API_CHAT_LIST_REQUEST,
  API_CHAT_REQUEST
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

export const requestChat = (reduction, key) => {
  let effects = reduction.get('effects');

  if (key !== reduction.getIn(['appState', 'chatList', 'selectedKey'])) {
    const uid = reduction.getIn(['appState', 'chatList', 'list', key, 'uid']);

    effects = effects.push(
      buildMessage(API_CHAT_REQUEST, uid)
    );
  }

  return reduction
    .set('effects', effects)
    .setIn(['appState', 'chatList', 'selectedKey'], key)
  ;
}

export const chatReceived = (reduction, response) => {
  let name = null;
  let chatMessages = List.of();
  let messages = reduction.getIn(['appState', 'app', 'messages']);

  const badResponse = !response || !response.data || response.status !== 200;

  if (!badResponse) {
    name = response.data.name;
    chatMessages = fromJS(response.data.messages);
  }
  else {
    messages = messages.push(createMessage('error', 'Error selecting chat!', 'Server error'));
  }

  return reduction
    .setIn(['appState', 'app', 'messages'], messages)
    .setIn(['appState', 'chat', 'name'], name)
    .setIn(['appState', 'chat', 'messages'], chatMessages)
  ;
}

export const chatSendMessage = (reduction, message) => {
  console.log('chatSendMessage');
  return reduction;
}

export const chatSendMessageDone = (reduction, response) => {
  console.log('chatSendMessageDone');
  return reduction;
}

