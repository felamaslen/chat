/**
 * @file app/actions/ChatActions.js
 */

import buildMessage from '../MessageBuilder';

import {
  CHAT_CHAT_LIST_REQUESTED,
  CHAT_CHAT_LIST_RECEIVED,
  CHAT_PERSON_ACTIVATED,
  CHAT_CHAT_RECEIVED,
  CHAT_MESSAGE_SENT,
  CHAT_MESSAGE_SEND_ACCEPTED
} from '../constants/actions';

export const chatListRequested = () => {
  return buildMessage(CHAT_CHAT_LIST_REQUESTED, {});
}

export const chatListReceived = response => {
  return buildMessage(CHAT_CHAT_LIST_RECEIVED, response);
}

export const personActivated = key => {
  return buildMessage(CHAT_PERSON_ACTIVATED, key);
}

export const chatReceived = response => {
  return buildMessage(CHAT_CHAT_RECEIVED, response);
}

export const chatMessageSent = message => {
  return buildMessage(CHAT_MESSAGE_SENT, message);
}

export const chatMessageSendAccepted = response => {
  return buildMessage(CHAT_MESSAGE_SEND_ACCEPTED, response);
}
