/**
 * @file app/reducers/GlobalReducer.js
 * Takes an action and executes it against the global application state reduction
 */

import {
  APP_USER_LOGIN_REQUESTED,
  APP_USER_LOGOUT_REQUESTED,
  APP_USER_STATUS_REQUESTED,
  APP_USER_LOGIN_RESPONSE_GIVEN,
  APP_LOADING_SPINNER_HIDDEN,
  APP_LOADED,
  APP_MESSAGE_DISMISSED,
  APP_MESSAGE_REMOVED,

  CHAT_CHAT_LIST_REQUESTED,
  CHAT_CHAT_LIST_RECEIVED,
  CHAT_PERSON_ACTIVATED,
  CHAT_CHAT_RECEIVED,
  CHAT_MESSAGE_SENT,
  CHAT_MESSAGE_SEND_ACCEPTED
} from '../constants/actions';

import {
  requestLogin,
  requestLogout,
  requestUserStatus,
  loginResponseHandler,
  hideLoadingSpinner,
  removeLoadingSpinner,
  dismissMessage,
  removeMessage
} from './AppReducer';

import {
  requestChatList,
  insertChatList,
  requestChat,
  chatReceived,
  chatSendMessage,
  chatSendMessageDone
} from './ChatReducer';

export default (reduction, action) => {
  switch (action.type) {
    case APP_USER_LOGIN_REQUESTED:
      return requestLogin(reduction, action.payload);
    case APP_USER_LOGOUT_REQUESTED:
      return requestLogout(reduction);
    case APP_USER_STATUS_REQUESTED:
      return requestUserStatus(reduction);
    case APP_USER_LOGIN_RESPONSE_GIVEN:
      return loginResponseHandler(reduction, action.payload);
    case APP_LOADING_SPINNER_HIDDEN:
      return hideLoadingSpinner(reduction);
    case APP_LOADED:
      return removeLoadingSpinner(reduction);
    case APP_MESSAGE_DISMISSED:
      return dismissMessage(reduction, action.payload);
    case APP_MESSAGE_REMOVED:
      return removeMessage(reduction, action.payload);

    case CHAT_CHAT_LIST_REQUESTED:
      return requestChatList(reduction);
    case CHAT_CHAT_LIST_RECEIVED:
      return insertChatList(reduction, action.payload);
    case CHAT_PERSON_ACTIVATED:
      return requestChat(reduction, action.payload);
    case CHAT_CHAT_RECEIVED:
      return chatReceived(reduction, action.payload);
    case CHAT_MESSAGE_SENT:
      return chatSendMessage(reduction, action.payload);
    case CHAT_MESSAGE_SEND_ACCEPTED:
      return chatSendMessageDone(reduction, action.payload);

    default:
      return reduction;
  }
}

