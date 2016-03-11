/**
 * @file app/actions/AppActions
 * Top level actions
 */

import buildMessage from '../MessageBuilder';

import {
  APP_PAGE_CHANGED,
  APP_WINDOW_RESIZED,
  APP_EVENT_HANDLER_STORED,
  APP_SEARCHED
} from '../constants/actions';

export const pageChanged = pageIndex => buildMessage(APP_PAGE_CHANGED, pageIndex);

export const windowResized = () => buildMessage(APP_WINDOW_RESIZED, {});

export const eventHandlerStored = handler => buildMessage(APP_EVENT_HANDLER_STORED, handler);

export const searched = searchTerm => buildMessage(APP_SEARCHED, searchTerm);

