import axios from 'axios';

import apiBaseUrl from '../../utils/apiBaseUrl';

/**
 * Logout request
 * @param {Object} callback
 */
export default function(callback) {
  axios.put(`${apiBaseUrl}/users/logout`, {}, {withCredentials: true})
      .then(function(response) {
        callback(response.data);
      })
      .catch(function(error) {
        callback({success: false});
      });
}
