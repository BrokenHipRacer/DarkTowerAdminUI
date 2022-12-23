import axios from "axios"

import apiBaseUrl from "../../utils/apiBaseUrl.js"

export default async function(filename, callback) {
  try {
    const response = await axios({
      url: `${apiBaseUrl}/images/check-if-filename-exists?filename=${filename}`
    })

    callback(response.data)
  } catch(error) {
    callback({success: false})
  }
}
