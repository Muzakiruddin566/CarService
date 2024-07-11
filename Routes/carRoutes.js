const express = require('express');
const { addCar, upload } = require('../Controllers/carController');
const { protect } = require('../Middlewares/authMiddleware');

const router = express.Router();
router.post('/', protect, upload.array('pictures', 10), addCar);

module.exports = router;
