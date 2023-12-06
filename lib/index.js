const {home, si, external} = require('./routes/index')
const {general, SiClient, SiMainContent} = require('./services/index');
const {siClientController} = require('./controllers/index');
module.exports = {
    home,
    si,
    external,
    general,
    SiClient,
    SiMainContent,
    siClientController
}