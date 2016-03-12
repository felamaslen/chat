/**
 * @file code/components/Messages.jsx
 */

import React, { PropTypes } from 'react';
import { List } from 'immutable';
import classNames from 'classnames';
import PureControllerView from './PureControllerView';

import {
  MESSAGE_TIMEOUT,
  MESSAGE_FADE_TIME
} from '../config';

import {
  messageDismissed,
  messageRemoved
} from '../actions/AppActions';

export default class Messages extends PureControllerView {
  _dismiss(key) {
    this.dispatchAction(messageDismissed(key));
    window.setTimeout(() => {
      this.dispatchAction(messageRemoved(key));
    }, MESSAGE_FADE_TIME);
  }

  render() {
    const messages = this.props.messages.map((item, key) => {
      if (item) {
        const messageClass = classNames({
          message:          true,
          'message-warn':   item.get('type') == 'warn',
          'message-error':  item.get('type') == 'error',
          fade:             item.get('fade')
        });

        if (!item.get('timeoutSet')) {
          window.setTimeout(() => {
            this.dispatchAction(messageDismissed(key));

            window.setTimeout(() => {
              this.dispatchAction(messageRemoved(key));
            }, MESSAGE_FADE_TIME);
          }, MESSAGE_TIMEOUT);
        }

        const body = item.get('body') && typeof item.get('body') == 'object' ? (
          <ul>{item.get('body').map((item, key) => (
            <li key={'msg-list-' + key}>{item}</li>
          ))}</ul>
        ) : item.get('body');

        return (
          <li key={key} onClick={this._dismiss.bind(this, key)} className={messageClass}>
            <div className="message-title">
              {item.get('title')}
            </div>
            <div className="message-body">
              {body}
            </div>
          </li>
        );
      }
      else {
        return null;
      }
    });

    return (
      <ul id="messages">
        {messages}
      </ul>
    );
  }
}

Messages.propTypes = {
  messages: PropTypes.instanceOf(List)
};

