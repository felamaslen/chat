/**
 * @file code/components/ChatList.jsx
 * Lists current chats and adds / removes chats
 */

import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';
import classNames from 'classnames';
import PureControllerView from './PureControllerView';

import {
} from '../common';

import {
} from '../actions/ChatActions';

export default class ChatList extends PureControllerView {
  render() {
    let chatList = null;

    // display nothing if we aren't logged in
    if (this.props.user) {
      const list = this.props.list.map((item, key) => {
        return (
          <li className="chat-list-item" key={key}>
            {item}
          </li>
        );
      });

      chatList = (
        <div id="chat-list-outer">
          <ul className="chat-list">
            {list}
          </ul>
        </div>
      );
    }

    return chatList;
  }
}

ChatList.propTypes = {
  list: PropTypes.instanceOf(List),
  user:     PropTypes.instanceOf(Map)
};

