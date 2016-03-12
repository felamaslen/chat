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
    const adminBarClass = classNames({
      'admin-bar-admin':  this.props.user.get('admin')
    });

    return (
      <div id="admin-bar" className={adminBarClass}>
        <button className="button" onClick={this._logout.bind(this)}>Log out</button>
      </div>
    );
  }
}

AdminBar.propTypes = {
  user: PropTypes.instanceOf(Map)
};

