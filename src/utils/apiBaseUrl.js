let apiBaseUrl;

if (process.env.NODE_ENV === 'development') {
  apiBaseUrl = process.env.DEV_ADMIN_API_URL;
} else {
  apiBaseUrl = process.env.PRODUCTION_ADMIN_API_URL;
}

export default apiBaseUrl;
