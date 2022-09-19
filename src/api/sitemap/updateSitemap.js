import axios from 'axios';

import apiBaseUrl from '../../utils/apiBaseUrl';

/**
 * Update the Sitemap request
 * @param {Object} callback
 */
export default function(callback) {
  axios.put(`${apiBaseUrl}/sitemap/update-xml-file`, {}, {withCredentials: true})
      .then(function(response) {
        callback(response.data);
      })
      .catch(function(error) {
        callback({submitError: true});
      });
}
