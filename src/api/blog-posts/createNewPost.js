import axios from 'axios';

import apiBaseUrl from '../../utils/apiBaseUrl';

/**
 * Create a New Blog Post request
 * @param {string} title
 * @param {string} urlTitle
 * @param {date} dateTimestamp
 * @param {string} tags, comma separated list
 * @param {string} thumbnailImageUrl
 * @param {string} markdownContent
 * @param {string} seoTitleTag
 * @param {string} seoMetaDescription
 * @param {Object} callback
 */
export default function(title, urlTitle, dateTimestamp,
    tags, thumbnailImageUrl, markdownContent,
    seoTitleTag, seoMetaDescription, callback) {
  axios.post(`${apiBaseUrl}/blog-posts/create-new`, {
    title: title,
    urlTitle: urlTitle,
    dateTimestamp: dateTimestamp,
    tags: tags,
    thumbnailImageUrl: thumbnailImageUrl,
    markdownContent: markdownContent,
    seoTitleTag: seoTitleTag,
    seoMetaDescription: seoMetaDescription,
  }, {
    withCredentials: true,
  })
      .then(function(response) {
        callback(response.data);
      })
      .catch(function(error) {
        callback({submitError: true});
      });
}
