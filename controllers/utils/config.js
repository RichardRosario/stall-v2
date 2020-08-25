/**
 * It is similar to having an env file
 */

module.exports = {
  port: parseInt(process.env.PORT) || 8080,
  mongoUrl: process.env.MONGO_URL || "mongodb://localhost:27017/stall2",
  baseUrl: process.env.BASE_URL || "http://localhost:8080",
  assetUrl: process.env.ASSET_URL || "http://localhost:8080",
};
