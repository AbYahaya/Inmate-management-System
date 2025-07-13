const express = require('express');
const router = express.Router();
const cellController = require('../controllers/cellController');

router.get('/', cellController.listCells);
router.post('/', cellController.createCell);
router.post('/:id/assign', cellController.assignInmate);

module.exports = router;
