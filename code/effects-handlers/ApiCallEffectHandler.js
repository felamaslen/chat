/**
 * @file app/effects-handlers/ApiCallEffectHandler.js
 * Handles API call effects
 */

import buildEffectHandler from '../effectHandlerBuilder';

import {
  urlSerialise
} from '../common';

import {
  apiBaseUrl
} from '../config';

import {
  API_LOGIN_REQUEST,
  API_LOGOUT_REQUEST,
  API_USER_STATUS
} from '../constants/effects';

import {
  userLoginResponseGiven
} from '../actions/AppActions';

import axios from 'axios';

// set axios defaults
axios.defaults.baseURL = apiBaseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default buildEffectHandler({
  [API_LOGIN_REQUEST]: (info, dispatcher) => {
    axios.post('user/login', urlSerialise({
      username: info.username,
      password: info.password,
      rememberme: info.rememberme
    })).then(
      response => dispatcher.dispatch(userLoginResponseGiven(response))
    ).catch(
      () => dispatcher.dispatch(userLoginResponseGiven(null))
    );
  },

  [API_LOGOUT_REQUEST]: (_, dispatcher) => {
    axios.get('user/logout').then(
      response => dispatcher.dispatch(userLoginResponseGiven(null))
    ).catch(
      () => dispatcher.dispatch(userLoginResponseGiven(null))
    );
  },

  // this is for the remember me feature
  [API_USER_STATUS]: (_, dispatcher) => {
    axios.get('user/status').then(
      response => dispatcher.dispatch(userLoginResponseGiven(response))
    ).catch(
      () => dispatcher.dispatch(userLoginResponseGiven(null))
    );
  }
});
