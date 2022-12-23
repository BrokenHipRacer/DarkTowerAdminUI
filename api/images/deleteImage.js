import axios from "axios"

import apiBaseUrl from "../../utils/apiBaseUrl.js"

export default function(filename, callback) {
  axios.put(`${apiBaseUrl}/images/delete-image`, {
    filename: filename
  }, {
    withCredentials: true
  })
  .then(function(response) {
    callback(response.data)
  })
  .catch(function(error) {
    callback({submitError: true})
  })
}
