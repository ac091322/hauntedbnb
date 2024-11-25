const express = require('express');
const router = express.Router();
const apiRouter = require('./api');


router.use('/api', apiRouter);

// static routes
// serve React build files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // serve the frontend's index.html file at the root route
  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });

  // serve the static assets in the frontend's build folder
  router.use(express.static(path.resolve("../frontend/dist")));

  // serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
    );
  });
}

// add a XSRF-TOKEN cookie
if (process.env.NODE_ENV !== 'production') {
  router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });
}
// This route should not be available in production, but it will not be exclusive to the production application until you implement the frontend of the application later. So for now, it will remain available to both the development and production environments.


module.exports = router;
