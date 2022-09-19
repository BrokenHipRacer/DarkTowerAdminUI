import React, {Component} from 'react';

/**
 * Error page
 */
export default class Error extends Component {
  /**
   * @param {Object} req
   * @param {Object} res
   * @param {Object} err
   * @return {{statusCode: *}}
   */
  static getInitialProps({req, res, err}) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;

    return {
      statusCode: statusCode,
    };
  }

  /**
   * @return {JSX.Element}
   */
  render() {
    return (
      <div className="layout-wrapper">
        <div className='error-page-wrapper'>
          {
                        this.props.statusCode === 404 ?
                            <div className='error-page-msg'>
                              <span>404 Page Not Found</span>
                            </div> : null
          }
          {
                        this.props.statusCode === 500 ?
                            <div className='error-page-msg'>
                              <span>500 Error</span>
                            </div> : null
          }
          {
                        this.props.statusCode !== 404 && this.props.statusCode !== 500 ?
                            <div className='error-page-msg'>
                              <span>An Error Occurred</span>
                            </div> : null
          }
        </div>
      </div>
    );
  }
}
