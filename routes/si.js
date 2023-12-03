const express = require('express');
const router = express.Router();
const clientController = require('../controllers/siClientController')
router.post('/settings/save', clientController.saveSettings);
// Get default window (index)
router.get('/', clientController.getPage);
// Get main window context
router.get('/general', clientController.getGeneralPage)
router.get(`/settings`, clientController.getSettingsPage);

router.get('/loader', (req, res)=> {
    res.render('mainwindow/loader')
})
module.exports = router;