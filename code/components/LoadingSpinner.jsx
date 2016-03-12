/**
 * @file code/components/LoadingSpinner.jsx
 * creates loading spinner at start of app load
 */

import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';
import classNames from 'classnames';
import PureControllerView from './PureControllerView';

import {
} from '../common';

import {
  loadingSpinnerFadeTime
} from '../config';

import {
  appLoaded,
  appLoadingSpinnerHidden
} from '../actions/AppActions';

export default class LoadingSpinner extends PureControllerView {
  componentDidUpdate() {
    const appIsLoaded = this.props.loadedUser;

    const appWasLoading = this.props.loadingApp === 2;

    if (appIsLoaded && appWasLoading) {
      this.dispatchNext(appLoadingSpinnerHidden());

      window.setTimeout(() => {
        this.dispatchAction(appLoaded());
      }, loadingSpinnerFadeTime);
    }
  }

  render() {
    let spinner = null;

    if (this.props.loadingApp > 0) {
      const loadingClasses = classNames({
        fade: this.props.loadingApp === 1
      });

      spinner = (
        <div className={loadingClasses} id="loading-outer">
          <div id="loading-inner">Loading...</div>
        </div>
      );
    }

    return spinner;
  }
}

LoadingSpinner.propTypes = {
  loadedUser: PropTypes.bool,
  loadingApp: PropTypes.number
};

