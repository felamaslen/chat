/**
 * @file code/reducers/AppReducer.js
 * Top level reducers
 */

import { fromJS } from 'immutable';

import {
} from '../config';

import {
  API_LOGIN_REQUEST
} from '../constants/effects';

import buildMessage from '../MessageBuilder';

export const requestLogin = (reduction, info) => {
  return reduction.set('effects', reduction.get('effects').push(
    buildMessage(API_LOGIN_REQUEST, info)
  ));
}

export const loginResponseHandler = (reduction, response) => {
  let user = null;

  let messages = reduction.getIn(['appState', 'messages']);

  const badResponse = !response || response.status !== 200 || !response.data;

  if (!badResponse) {
    const badLogin = !badResponse && response.data === 'bad_login';

    if (!badLogin) {
      user = fromJS(response.data);
    }
    else {
      messages = messages.push(fromJS({
        type:   'error',
        title:  'Bad username and/or password',
        body:   null
      }));
    }
  }

  console.debug('new user', user);

  return reduction
    .setIn(['appState', 'app', 'user'], user)
    .setIn(['appState', 'messages'], messages)
  ;
}
