const express = require('express')
const router = express.Router();
const clientController = require('../controllers/externalClientController');

router.get('/', clientController.exposeApi);

module.exports = router