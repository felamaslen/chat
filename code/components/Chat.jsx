/**
 * @file code/components/UserLoginForm.jsx
 * Creates login form
 */

import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';
import classNames from 'classnames';
import PureControllerView from './PureControllerView';

import {
  getDateFromTime
} from '../common';

import {
} from '../actions/ChatActions';

export default class Chat extends PureControllerView {
  render() {
    let chat = null;

    // display nothing if we aren't logged in
    if (this.props.user) {
      const messages = this.props.messages.map((item, key) => {
        const listItemClass = classNames({
          'chat-message': true,
          'mine':         item.get('uid') === this.props.user.get('uid')
        });

        return (
          <li className={listItemClass} key={key}>
            <div className="chat-message-blob">
              <span className="name">{item.get('name')}</span>
              <span className="time">{getDateFromTime(item.get('time'))}</span>
              <span className="text">{item.get('text')}</span>
            </div>
          </li>
        );
      });

      chat = (
        <div id="chat-outer">
          <ul className="chat-messages">
            {messages}
          </ul>
        </div>
      );
    }

    return chat;
  }
}

Chat.propTypes = {
  messages: PropTypes.instanceOf(List),
  user:     PropTypes.instanceOf(Map)
};

