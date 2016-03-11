/**
 * @file app/reducers/GlobalReducer.js
 * Takes an action and executes it against the global application state reduction
 */

import {
  APP_USER_LOGIN_REQUESTED,
  APP_USER_LOGIN_RESPONSE_GIVEN
} from '../constants/actions';

import {
  requestLogin,
  loginResponseHandler
} from './AppReducer';

export default (reduction, action) => {
  switch (action.type) {
    case APP_USER_LOGIN_REQUESTED:
      return requestLogin(reduction, action.payload);
    case APP_USER_LOGIN_RESPONSE_GIVEN:
      return loginResponseHandler(reduction, action.payload);

    default:
      return reduction;
  }
}

