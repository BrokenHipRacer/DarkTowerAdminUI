const withPlugins = require("next-compose-plugins")
const removeImports = require("next-remove-imports")

const config = {
    env: {
        "DEV_FRONTEND_API_URL": "http://localhost:5000",
        "DEV_ADMIN_API_URL": "http://localhost:5001",
        "PRODUCTION_ADMIN_API_URL": "https://admin-api.alsberge.dev",
        "PRODUCTION_FRONTEND_API_URL": "https://api.alsberge.dev",
        "PRODUCTION_FRONTEND_WEBSITE_URL": "https://alsberge.dev"
    }
}

module.exports = withPlugins([
    removeImports({})
], config)
