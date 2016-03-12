/**
 * @file app/actions/AppActions
 * Top level actions
 */

import buildMessage from '../MessageBuilder';

import {
  APP_USER_LOGIN_REQUESTED,
  APP_USER_STATUS_REQUESTED,
  APP_USER_LOGIN_RESPONSE_GIVEN,
  APP_LOADED,
  APP_LOADING_SPINNER_HIDDEN
} from '../constants/actions';

export const userLoginRequested = (username, password, rememberme) => {
  return buildMessage(APP_USER_LOGIN_REQUESTED, {
    username,
    password,
    rememberme
  });
}

export const userStatusRequested = () => {
  return buildMessage(APP_USER_STATUS_REQUESTED, {});
}

export const userLoginResponseGiven = response => {
  return buildMessage(APP_USER_LOGIN_RESPONSE_GIVEN, response);
}

export const appLoaded = () => {
  return buildMessage(APP_LOADED, {});
}

export const appLoadingSpinnerHidden = () => {
  return buildMessage(APP_LOADING_SPINNER_HIDDEN, {});
}

