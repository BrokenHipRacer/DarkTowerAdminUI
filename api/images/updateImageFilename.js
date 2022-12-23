import axios from "axios"

import apiBaseUrl from "../../utils/apiBaseUrl.js"

export default function(originalFilename, newFilename, callback) {
  axios.put(`${apiBaseUrl}/images/update-image-filename`, {
    originalFilename: originalFilename,
    newFilename: newFilename
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
