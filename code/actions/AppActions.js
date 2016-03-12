/**
 * @file app/actions/AppActions
 * Top level actions
 */

import buildMessage from '../MessageBuilder';

import {
  APP_USER_LOGIN_REQUESTED,
  APP_USER_LOGOUT_REQUESTED,
  APP_USER_STATUS_REQUESTED,
  APP_USER_LOGIN_RESPONSE_GIVEN,
  APP_LOADED,
  APP_LOADING_SPINNER_HIDDEN,
  APP_MESSAGE_DISMISSED,
  APP_MESSAGE_REMOVED
} from '../constants/actions';

export const userLoginRequested = (username, password, rememberme) => {
  return buildMessage(APP_USER_LOGIN_REQUESTED, {
    username,
    password,
    rememberme
  });
}

export const userLogoutRequested = () => {
  return buildMessage(APP_USER_LOGOUT_REQUESTED, {});
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

export const messageDismissed = key => {
  return buildMessage(APP_MESSAGE_DISMISSED, key);
}

export const messageRemoved = key => {
  return buildMessage(APP_MESSAGE_REMOVED, key);
}

