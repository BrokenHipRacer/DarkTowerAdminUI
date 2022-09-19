import axios from 'axios';

import apiBaseUrl from '../../utils/apiBaseUrl';

/**
 * Remove Admin Cookie request
 */
export default function() {
  axios.put(`${apiBaseUrl}/users/remove-admin-user-cookie`, {}, {withCredentials: true})
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        return;
      });
}
