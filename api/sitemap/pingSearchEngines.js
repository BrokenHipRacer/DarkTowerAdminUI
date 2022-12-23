import axios from "axios"

import apiBaseUrl from "../../utils/apiBaseUrl.js"

export default function(callback) {
  axios.put(`${apiBaseUrl}/sitemap/ping-search-engines`, {}, {withCredentials: true})
  .then(function(response) {
    callback(response.data)
  })
  .catch(function(error) {
    callback({submitError: true})
  })
}
