import axios from "axios"

import apiBaseUrl from "../../utils/apiBaseUrl.js"

export default function(callback) {
  axios.put(`${apiBaseUrl}/sitemap/restart-frontend-website-pm2-process`, {}, {withCredentials: true})
  .then(function(response) {
    callback(response.data)
  })
  .catch(function(error) {
    callback({submitError: true})
  })
}
