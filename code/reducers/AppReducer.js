/**
 * @file code/reducers/AppReducer.js
 * Top level reducers
 */

import { fromJS } from 'immutable';

import {
} from '../config';

import {
  API_LOGIN_REQUEST,
  API_LOGOUT_REQUEST,
  API_USER_STATUS
} from '../constants/effects';

import buildMessage from '../MessageBuilder';

export const requestLogin = (reduction, info) => {
  return reduction.set('effects', reduction.get('effects').push(
    buildMessage(API_LOGIN_REQUEST, info)
  ));
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

  let messages = reduction.getIn(['appState', 'messages']);

  const badResponse = !response || response.status !== 200 || !response.data
    || typeof response.data !== 'object';

  if (!badResponse) {
    const badLogin = !response.data.uid;

    if (badLogin) {
      messages = messages.push(fromJS({
        type:   'error',
        title:  'Bad username and/or password',
        body:   null
      }));
    }
    else {
      user = fromJS(response.data);
    }
  }

  return reduction
    .setIn(['appState', 'app', 'user'], user)
    .setIn(['appState', 'messages'], messages)
    .setIn(['appState', 'app', 'loadedUser'], true)
  ;
}

export const hideLoadingSpinner = reduction => {
  return reduction.setIn(['appState', 'app', 'loadingApp'], 1);
}

export const removeLoadingSpinner = reduction => {
  return reduction.setIn(['appState', 'app', 'loadingApp'], 0);
}

