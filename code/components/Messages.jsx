/**
 * @file code/components/Messages.jsx
 */

import React, { PropTypes } from 'react';
import { List } from 'immutable';
import classNames from 'classnames';
import PureControllerView from './PureControllerView';

import {
} from '../common';

import {
  messageDismissed
} from '../actions/AppActions';

export default class Messages extends PureControllerView {
  _dismiss(key) {
    this.dispatchAction(messageDismissed(key));
  }

  render() {
    const messages = this.props.messages.map((item, key) => {
      if (item) {
        const messageClass = classNames({
          message:          true,
          'message-warn':   item.get('type') == 'warn',
          'message-error':  item.get('type') == 'error'
        });

        return (
          <li key={key} onClick={this._dismiss.bind(this, key)} className={messageClass}>
            <div className="message-title">
              {item.get('title')}
            </div>
            <div className="message-body">
              {item.get('body')}
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

