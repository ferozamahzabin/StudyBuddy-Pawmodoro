const express = require('express');
const router = express.Router();
const controller = require('../controller/settingsController');

router.post('/', controller.saveUserSettings);
router.get('/', controller.getUserSettings);

module.exports = router;
