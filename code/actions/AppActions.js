/**
 * @file app/actions/AppActions
 * Top level actions
 */

import buildMessage from '../MessageBuilder';

import {
  APP_USER_LOGIN_REQUESTED,
  APP_USER_LOGIN_RESPONSE_GIVEN
} from '../constants/actions';

export const userLoginRequested = (username, password, rememberme) => {
  return buildMessage(APP_USER_LOGIN_REQUESTED, {
    username,
    password,
    rememberme
  });
}

export const userLoginResponseGiven = response => {
  return buildMessage(APP_USER_LOGIN_RESPONSE_GIVEN, response);
}

