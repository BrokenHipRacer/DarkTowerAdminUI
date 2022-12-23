import axios from "axios"

import apiBaseUrl from "../../utils/apiBaseUrl.js"

export default function(formData, callback) {
  axios.post(`${apiBaseUrl}/images/upload`, formData, {withCredentials: true})
  .then(function(response) {
    callback(response.data)
  })
  .catch(function(error) {
    callback({submitError: true})
  })
}
