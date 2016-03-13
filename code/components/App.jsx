/**
 * @file code/components/App.jsx
 * Builds the main application by running the actions (via globalReducer)
 * and loading other components
 */

import { List } from 'immutable';
import React, { Component } from 'react';
import { Dispatcher } from 'flux';

import globalReducer from '../reducers/GlobalReducer';

// load other components
import AdminBar from './AdminBar.jsx';
import Chat from './Chat.jsx';
import ChatList from './ChatList.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import Messages from './Messages.jsx';
import UserLoginForm from './UserLoginForm.jsx';

import apiCallEffectHandler from '../effects-handlers/ApiCallEffectHandler';

import Reduction from '../reduction';

export default class App extends Component {
  constructor(props) {
    super(props);

    const dispatcher = new Dispatcher();

    dispatcher.register(action => {
      let reduction = this.state.reduction;

      reduction = reduction.set('effects', List.of());

      reduction = globalReducer(reduction, action);

      reduction.get('effects').forEach(apiCallEffectHandler.bind(null, dispatcher));

      this.setState({reduction});
    });

    this.state = {
      dispatcher: dispatcher,
      reduction:  new Reduction()
    };
  }

  render() {
    let adminBar = null;
    let chatList = null;
    let chat = null;

    if (this.state.reduction.getIn(['appState', 'app', 'user'])) {
      adminBar = (
        <AdminBar dispatcher={this.state.dispatcher}
          user={this.state.reduction.getIn(['appState', 'app', 'user'])}
        />
      );

      chatList = (
        <ChatList dispatcher={this.state.dispatcher}
          list={this.state.reduction.getIn(['appState', 'chatList', 'list'])}
          selectedKey={this.state.reduction.getIn(['appState', 'chatList', 'selectedKey'])}
          user={this.state.reduction.getIn(['appState', 'app', 'user'])}
        />
      );

      chat = (
        <Chat dispatcher={this.state.dispatcher}
          messages={this.state.reduction.getIn(['appState', 'chat', 'messages'])}
          name={this.state.reduction.getIn(['appState', 'chat', 'name'])}
          user={this.state.reduction.getIn(['appState', 'app', 'user'])}
        />
      );
    }

    return (
      <main>
        <Messages dispatcher={this.state.dispatcher}
          messages={this.state.reduction.getIn(['appState', 'app', 'messages'])}
        />
        <LoadingSpinner dispatcher={this.state.dispatcher}
          loadedUser={this.state.reduction.getIn(['appState', 'app', 'loadedUser'])}
          loadedChatList={this.state.reduction.getIn(['appState', 'app', 'loadedChatList'])}
          loadingApp={this.state.reduction.getIn(['appState', 'app', 'loadingApp'])}
        />
        <UserLoginForm dispatcher={this.state.dispatcher}
          user={this.state.reduction.getIn(['appState', 'app', 'user'])}
          loadedUser={this.state.reduction.getIn(['appState', 'app', 'loadedUser'])}
        />
        {adminBar}
        {chatList}
        {chat}
      </main>
    );
  }
}

