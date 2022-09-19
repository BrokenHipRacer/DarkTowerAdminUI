import axios from 'axios';

import apiBaseUrl from '../../utils/apiBaseUrl';

/**
 * Get Image by Filename request
 * @param {string} filename
 * @param {Object} req
 * @return {Promise<{getDataError: boolean}|*>}
 */
export default async function(filename, req) {
  try {
    const cookie = req.headers.cookie ? req.headers.cookie : '';

    const response = await axios({
      url: `${apiBaseUrl}/images/get-image-by-filename?filename=${filename}`,
      headers: req ? {cookie: cookie} : '',
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return {getDataError: true};
  }
}
