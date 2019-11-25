const express = require('express');
const router = express.Router();

var visit = require('../controllers/data');
router.post('/entry', visit.entry);
router.post('/exit', visit.exit);
module.exports = router;