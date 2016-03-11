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
import UserLoginForm from './UserLoginForm.jsx';
import ChatList from './ChatList.jsx';
import Chat from './Chat.jsx';

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
    return (
      <main>
        <UserLoginForm dispatcher={this.state.dispatcher}
          user={this.state.reduction.getIn(['appState', 'app', 'user'])}
          userLoaded={this.state.reduction.getIn(['appState', 'app', 'userLoaded'])}
        />
        <ChatList dispatcher={this.state.dispatcher}
          list={this.state.reduction.getIn(['appState', 'chatList', 'list'])}
          user={this.state.reduction.getIn(['appState', 'app', 'user'])}
        />
        <Chat dispatcher={this.state.dispatcher}
          messages={this.state.reduction.getIn(['appState', 'chat', 'messages'])}
          user={this.state.reduction.getIn(['appState', 'app', 'user'])}
        />
      </main>
    );
  }
}
