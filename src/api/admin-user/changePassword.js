import axios from 'axios';

import apiBaseUrl from '../../utils/apiBaseUrl';

/**
 * Change Admin Password request
 * @param {string} currentPassword
 * @param {string} newPassword
 * @param {Object} callback
 */
export default function(currentPassword, newPassword, callback) {
  axios.put(`${apiBaseUrl}/users/change-password`, {
    currentPassword: currentPassword,
    newPassword: newPassword,
  }, {
    withCredentials: true,
  })
      .then(function(response) {
        callback(response.data);
      })
      .catch(function(error) {
        callback({submitError: false});
      });
}
