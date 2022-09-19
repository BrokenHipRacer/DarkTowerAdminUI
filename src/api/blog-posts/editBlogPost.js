import axios from 'axios';

import apiBaseUrl from '../../utils/apiBaseUrl';

/**
 * Edit a Blog Post request
 * @param {string} id
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
export default function(id, title, urlTitle, dateTimestamp,
    tags, thumbnailImageUrl, markdownContent,
    seoTitleTag, seoMetaDescription, callback) {
  axios.put(`${apiBaseUrl}/blog-posts/edit`, {
    id: id,
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
