import axios from 'axios';

import apiBaseUrl from '../../utils/apiBaseUrl';

/**
 * Restart Frontend website pm2 request
 * @param {Object} callback
 */
export default function(callback) {
  axios.put(`${apiBaseUrl}/sitemap/restart-frontend-website-pm2-process`, {}, {withCredentials: true})
      .then(function(response) {
        callback(response.data);
      })
      .catch(function(error) {
        callback({submitError: true});
      });
}
