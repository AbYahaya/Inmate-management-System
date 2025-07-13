const express = require('express');
const router = express.Router();
const inmateController = require('../controllers/inmateController');

router.get('/', inmateController.listInmates);
router.post('/', inmateController.createInmate);

module.exports = router;
