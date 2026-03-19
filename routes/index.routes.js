const express = require('express');
const router = express.Router();

const {
  getHome,
  getStatus,
  getAbout,
  getContact,
  getVisits
} = require('../controllers/home.controller');

const loggerMiddleware = require('../middlewares/logger.middleware');

router.get('/', loggerMiddleware, getHome);
router.get('/status', loggerMiddleware, getStatus);
router.get('/about', loggerMiddleware, getAbout);
router.get('/contact', loggerMiddleware, getContact);
router.get('/api/visits', loggerMiddleware, getVisits);

module.exports = router;