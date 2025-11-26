const app = require('../app');

// Export handler pour Vercel serverless functions
module.exports = (req, res) => {
  return app(req, res);
};

