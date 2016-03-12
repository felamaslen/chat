/**
 * @file app/actions/ChatActions.js
 */

import buildMessage from '../MessageBuilder';

import {
  CHAT_CHAT_LIST_REQUESTED,
  CHAT_CHAT_LIST_RECEIVED
} from '../constants/actions';

export const chatListRequested = () => {
  return buildMessage(CHAT_CHAT_LIST_REQUESTED, {});
}

export const chatListReceived = response => {
  return buildMessage(CHAT_CHAT_LIST_RECEIVED, response);
}
