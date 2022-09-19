import axios from 'axios';

import apiBaseUrl from '../../utils/apiBaseUrl';

/**
 * Get All Images request
 * @param {Object} req
 * @return {Promise<{getDataError: boolean}|*>}
 */
export default async function(req) {
  try {
    const cookie = req.headers.cookie ? req.headers.cookie : '';

    const response = await axios({
      url: `${apiBaseUrl}/images/get-all-images`,
      headers: req ? {cookie: cookie} : '',
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return {getDataError: true};
  }
}
