/**
 * @file code/reducers/AppReducer.js
 * Top level reducers
 */

import { List, fromJS } from 'immutable';

import {
  createMessage
} from '../common';

import {
  API_LOGIN_REQUEST,
  API_LOGOUT_REQUEST,
  API_USER_STATUS
} from '../constants/effects';

import buildMessage from '../MessageBuilder';

export const requestLogin = (reduction, info) => {
  let effects = reduction.get('effects');
  let messages = reduction.getIn(['appState', 'app', 'messages']);

  let badInfo = List.of();

  if (info.username.length == 0) {
    badInfo = badInfo.push('Must provide a username');
  }
  if (info.password.length == 0) {
    badInfo = badInfo.push('Must provide a password');
  }

  if (badInfo.size > 0) {
    messages = messages.push(createMessage(
      'warn', 'Please review the following:', badInfo
    ));
  }
  else {
    effects = effects.push(buildMessage(API_LOGIN_REQUEST, info));
  }

  return reduction.set('effects', effects).setIn(['appState', 'app', 'messages'], messages);
}

export const requestLogout = reduction => {
  return reduction.set('effects', reduction.get('effects').push(
    buildMessage(API_LOGOUT_REQUEST, {})
  ));
}

export const requestUserStatus = reduction => {
  return reduction.set('effects', reduction.get('effects').push(
    buildMessage(API_USER_STATUS, {})
  ));
}

export const loginResponseHandler = (reduction, response) => {
  let user = null;

  let messages = reduction.getIn(['appState', 'app', 'messages']);

  const badResponse = !response || response.status !== 200 || !response.data
    || typeof response.data !== 'object';

  if (!badResponse) {
    const loggedIn = !!response.data.uid;
    const loadedUser = reduction.getIn(['appState', 'app', 'loadedUser']);

    if (loggedIn) {
      user = fromJS(response.data);
    }
    else if (loadedUser) {
      messages = messages.push(createMessage('error', 'Bad username and/or password', null));
    }
  }

  return reduction
    .setIn(['appState', 'app', 'user'], user)
    .setIn(['appState', 'app', 'messages'], messages)
    .setIn(['appState', 'app', 'loadedUser'], true)
  ;
}

export const hideLoadingSpinner = reduction => {
  return reduction.setIn(['appState', 'app', 'loadingApp'], 1);
}

export const removeLoadingSpinner = reduction => {
  return reduction.setIn(['appState', 'app', 'loadingApp'], 0);
}

export const dismissMessage = (reduction, key) => {
  let messages = reduction.getIn(['appState', 'app', 'messages']);
  let message = messages.get(key);

  if (!!message) {
    message = message.set('fade', true).set('timeoutSet', true);

    messages = messages.set(key, message);
  }

  return reduction.setIn(['appState', 'app', 'messages'], messages);
}

export const removeMessage = (reduction, key) => {
  const messages = reduction.getIn(['appState', 'app', 'messages']).set(key, null);

  return reduction.setIn(['appState', 'app', 'messages'], messages);
}

