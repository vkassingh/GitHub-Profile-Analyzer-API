const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profileController');

router.post('/analyze', ProfileController.analyzeProfile);
router.get('/', ProfileController.getAll);
router.get('/:username', ProfileController.getByUsername);

module.exports = router;