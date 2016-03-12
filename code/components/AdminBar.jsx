/**
 * @file code/components/AdminBar.jsx
 */

import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import classNames from 'classnames';
import PureControllerView from './PureControllerView';

import {
} from '../common';

import {
  userLogoutRequested,
} from '../actions/AppActions';

export default class AdminBar extends PureControllerView {
  _logout() {
    this.dispatchAction(userLogoutRequested());
  }

  render() {
    let form = null;

    if (this.props.user) {
      const adminBarClass = classNames({
        'admin-bar':        true,
        'admin-bar-admin':  this.props.user.admin
      });

      form = (
        <div className={adminBarClass}>
          <button onClick={this._logout.bind(this)}>Log out</button>
        </div>
      );
    }

    return form;
  }
}

AdminBar.propTypes = {
  user: PropTypes.instanceOf(Map)
};

