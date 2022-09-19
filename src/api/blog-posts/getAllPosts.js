import axios from 'axios';

import apiBaseUrl from '../../utils/apiBaseUrl';

/**
 * Get All Blog Posts request
 * @param {Object} req
 * @return {Promise<{submitError: boolean}|*>}
 */
export default async function(req) {
  try {
    const cookie = req.headers.cookie ? req.headers.cookie : '';

    const response = await axios({
      url: `${apiBaseUrl}/blog-posts/get-all`,
      headers: req ? {cookie: cookie} : '',
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return {submitError: true};
  }
}
