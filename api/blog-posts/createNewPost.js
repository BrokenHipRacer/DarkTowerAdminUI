import axios from "axios"

import apiBaseUrl from "../../utils/apiBaseUrl.js"

export default function(title, urlTitle, dateTimestamp, tags, thumbnailImageUrl, markdownContent, seoTitleTag, seoMetaDescription, callback) {
  axios.post(`${apiBaseUrl}/blog-posts/create-new`, {
    title: title,
    urlTitle: urlTitle,
    dateTimestamp: dateTimestamp,
    tags: tags,
    thumbnailImageUrl: thumbnailImageUrl,
    markdownContent: markdownContent,
    seoTitleTag: seoTitleTag,
    seoMetaDescription: seoMetaDescription
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
