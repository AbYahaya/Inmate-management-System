const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

router.get('/', visitorController.listVisitors);
router.post('/', visitorController.createVisitor);

module.exports = router;
