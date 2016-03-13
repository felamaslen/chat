/**
 * @file code/components/ChatList.jsx
 * Lists current chats and adds / removes chats
 */

import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';
import classNames from 'classnames';
import PureControllerView from './PureControllerView';

import {
  DEFAULT_USER_PICTURE
} from '../config';

import {
  chatListRequested,
  personActivated
} from '../actions/ChatActions';

export default class ChatList extends PureControllerView {
  _activatePerson(key) {
    this.dispatchAction(personActivated(key));
  }

  componentWillMount() {
    // we've just logged in, so fetch a list of chats
    this.dispatchNext(chatListRequested());
  }

  render() {
    let chatList = null;

    const list = this.props.list.map((item, key) => {
      const pictureSrc = item.get('picture') || DEFAULT_USER_PICTURE;

      const picture = (
        <span className="chat-list-user-picture">
          <img src={pictureSrc}/>
        </span>
      );

      const chatListItemClass = classNames({
        'chat-list-item': true,
        selected:         key === this.props.selectedKey
      });

      return (
        <li onClick={this._activatePerson.bind(this, key)} className={chatListItemClass} key={key}>
          {picture}
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
  list:         PropTypes.instanceOf(List),
  selectedKey:  PropTypes.number,
  user:         PropTypes.instanceOf(Map)
};

