/**
 * @file code/components/UserLoginForm.jsx
 * Creates login form
 */

import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import classNames from 'classnames';
import PureControllerView from './PureControllerView';

import {
} from '../common';

import {
  userLoginRequested,
  userStatusRequested
} from '../actions/AppActions';

export default class UserLoginForm extends PureControllerView {
  componentWillMount() {
    this.dispatchAction(userStatusRequested());
  }

  _formSubmitHandler(event) {
    const username = this.refs.inputUsername.value;
    const password = this.refs.inputPassword.value;

    this.dispatchAction(userLoginRequested(
      username,
      password,
      this.refs.inputRememberMe.checked
    ));

    event.preventDefault();
    return false;
  }

  render() {
    let form = null;

    if (this.props.loadedUser && !this.props.user) {
      const inputUsernameClass = classNames({
        'input-text':     true,
        'input-username': true
      });

      const inputPasswordClass = classNames({
        'input-text':     true,
        'input-password': true
      });

      const inputRememberMeClass = classNames({
        'input-checkbox': true,
        'input-rememberme': true
      });

      form = (
        <div id="login-form-outer">
          <form onSubmit={this._formSubmitHandler.bind(this)}>
            <div className="input-outer">
              <span className="input-label">Username</span>
              <input tabIndex="1" ref="inputUsername" type="text" className={inputUsernameClass}/>
            </div>
            <div className="input-outer">
              <span className="input-label">Password</span>
              <input tabIndex="2" ref="inputPassword" type="password" className={inputPasswordClass}/>
            </div>
            <div className="input-outer">
              <div className="input-checkbox-outer">
                <input tabIndex="3" ref="inputRememberMe" type="checkbox" className={inputRememberMeClass}
                  id="input-remember-me"/>
                <label htmlFor="input-remember-me"/>
                Remember me
              </div>
              <input tabIndex="4" className="button button-login" type="submit" value="Log in"/>
            </div>
          </form>
        </div>
      );
    }

    return form;
  }
}

UserLoginForm.propTypes = {
  loadedUser: PropTypes.bool,
  user:       PropTypes.instanceOf(Map)
};

