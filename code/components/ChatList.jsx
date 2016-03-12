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
  chatListRequested
} from '../actions/ChatActions';

export default class ChatList extends PureControllerView {
  componentWillMount() {
    // we've just logged in, so fetch a list of chats
    this.dispatchNext(chatListRequested());
  }

  render() {
    let chatList = null;

    const list = this.props.list.map((item, key) => {
      return (
        <li className="chat-list-item" key={key}>
          <span className="chat-list-item-name">
            {item.get('name')}
          </span>
        </li>
      );
    });

    return (
      <div id="chat-list-outer">
        <ul className="chat-list">
          {list}
        </ul>
      </div>
    );
  }
}

ChatList.propTypes = {
  list: PropTypes.instanceOf(List),
  user:     PropTypes.instanceOf(Map)
};

