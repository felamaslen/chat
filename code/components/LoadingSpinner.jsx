/**
 * @file code/components/LoadingSpinner.jsx
 * creates loading spinner at start of app load
 */

import React, { PropTypes } from 'react';
import { List, Map } from 'immutable';
import classNames from 'classnames';
import PureControllerView from './PureControllerView';

import {
  loadingSpinnerFadeTime
} from '../config';

import {
  appLoaded,
  appLoadingSpinnerHidden
} from '../actions/AppActions';

export default class LoadingSpinner extends PureControllerView {
  componentDidUpdate() {
    const appIsLoaded =
      this.props.loadedUser &&
      this.props.loadedChatList
    ;

    const appWasLoading = this.props.loadingApp === 2;

    if (appIsLoaded && appWasLoading) {
      window.setTimeout(() => {
        this.dispatchAction(appLoadingSpinnerHidden());

        window.setTimeout(() => {
          this.dispatchAction(appLoaded());
        }, loadingSpinnerFadeTime);
      }, 500);
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
          <div id="loading-inner">
            <div className="loader">Loading...</div>
          </div>
        </div>
      );
    }

    return spinner;
  }
}

LoadingSpinner.propTypes = {
  loadedChatList: PropTypes.bool,
  loadedUser: PropTypes.bool,
  loadingApp: PropTypes.number
};

