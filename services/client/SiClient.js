const {
    title,
    menu
} = require('../api/Constants/Constants')
class SiClient{
    constructor() {
        this.title = title;
        this.theme = process.env.APP_THEME || 'light';
        this.data = {
            menu,
            defaultRef: '/si/general'
        }
    }
}

class SiMainContent{
    constructor(_title, _subtitle, _data){
        this.title = _title;
        this.subtitle = _subtitle;
        this.theme = process.env.APP_THEME || 'light';
        this.data=_data;
    }
}

module.exports = {SiClient, SiMainContent}