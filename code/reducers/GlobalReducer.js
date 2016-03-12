/**
 * @file app/reducers/GlobalReducer.js
 * Takes an action and executes it against the global application state reduction
 */

import {
  APP_USER_LOGIN_REQUESTED,
  APP_USER_STATUS_REQUESTED,
  APP_USER_LOGIN_RESPONSE_GIVEN,
  APP_LOADING_SPINNER_HIDDEN,
  APP_LOADED
} from '../constants/actions';

import {
  requestLogin,
  requestUserStatus,
  loginResponseHandler,
  hideLoadingSpinner,
  removeLoadingSpinner
} from './AppReducer';

export default (reduction, action) => {
  switch (action.type) {
    case APP_USER_LOGIN_REQUESTED:
      return requestLogin(reduction, action.payload);
    case APP_USER_STATUS_REQUESTED:
      return requestUserStatus(reduction);
    case APP_USER_LOGIN_RESPONSE_GIVEN:
      return loginResponseHandler(reduction, action.payload);
    case APP_LOADING_SPINNER_HIDDEN:
      return hideLoadingSpinner(reduction);
    case APP_LOADED:
      return removeLoadingSpinner(reduction);
    default:
      return reduction;
  }
}

