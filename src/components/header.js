import React, {Component} from 'react';

import logout from '../api/admin-user/logout';

/**
 * Custom Header Component
 */
export default class CustHeader extends Component {
  /**
   *
   */
  requestLogout = () => {
    logout(function() {
      window.location.href = '/login';
    });
  };

  /**
   * @return {JSX.Element}
   */
  render() {
    return (
      <div className="header-wrapper">
        <div className="header-logo">
          <a href="/">
            <span>Admin Dashboard</span>
          </a>
        </div>
        <div className="header-log-out">
          <div onClick={() => this.requestLogout()} className="header-log-out">
            <span>Logout</span>
          </div>
        </div>
      </div>
    );
  }
}
