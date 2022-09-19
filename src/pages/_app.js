import React from 'react';

import '@uiw/react-md-editor/dist/mdeditor.css';
import '@uiw/react-md-editor/dist/mdeditor.min.css';

// layout
import '../styles/components/header.css';
import '../styles/components/sidebar.css';
import '../styles/layout.css';

// pages
import '../styles/blog/create-new-post.css';
import '../styles/blog/edit.css';
import '../styles/blog/index.css';
import '../styles/change-password.css';
import '../styles/images/edit.css';
import '../styles/images/index.css';
import '../styles/images/upload.css';
import '../styles/login.css';
import '../styles/sitemap.css';
import '../styles/_error.css';

// modals
import '../styles/components/modals/delete-blog-post.css';
import '../styles/components/modals/delete-image.css';

/**
 * Application builder
 * @param {Component} Component
 * @param {Object} pageProps
 * @return {JSX.Element}
 * @constructor
 */
export default function MyApp({Component, pageProps}) {
  return <Component {...pageProps} />;
}
