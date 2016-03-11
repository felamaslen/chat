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

    if (this.props.userLoaded && !this.props.user) {
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
            <table>
              <tbody>
                <tr>
                  <th>Username:</th>
                  <td><input ref="inputUsername" type="text" className={inputUsernameClass}/></td>
                </tr>
                <tr>
                  <th>Password:</th>
                  <td><input ref="inputPassword" type="password" className={inputPasswordClass}/></td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <input ref="inputRememberMe" type="checkbox" className={inputRememberMeClass}/>
                    Remember me
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <input type="submit" value="Log in"/>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      );
    }

    return form;
  }
}

UserLoginForm.propTypes = {
  user:       PropTypes.instanceOf(Map),
  userLoaded: PropTypes.bool
};

