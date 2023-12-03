const {SiClient, SiMainContent} = require('../services/client/SiClient')
const fs = require('fs/promises')
const {
    general,
} = require("../services/api");

const setEnv = async (_data) => {
    try{
        let content = '';
        for(let key in _data){
            content +=`${key.toUpperCase()}=${_data[key]}\n`
        }
        await fs.writeFile('./.env', content)
        return true
    }catch (e){
        return false;
    }
}


module.exports = {
    getPage: async (req, res, next)=>{
            let data = await new SiClient()
            res.render('index', data);
    },

    getGeneralPage: async (req, res, next)=>{
        let dto = await new general.DTO().build();
        let page = new general.PTO(dto)
        let data = new SiMainContent(page.basic.system, page.basic.os, page)
        res.render('mainwindow/general', data);
    },

    getSettingsPage: (req, res, next) => {

        res.render('mainwindow/settings', new SiMainContent('Settings', '',
            {
                app_title: process.env.APP_TITLE,
                app_port: process.env.APP_PORT,
                app_theme: process.env.APP_THEME
            }));
    },

    saveSettings: async (req, res, next)=> {
        try{
            if(Object.keys(req.body).length > 0 && await setEnv(req.body)){
                res.status(200)
                    .json({status: "success", "message":"Save successful, you will need to restart this service for changes to take affect. "})
            }
        }catch (e){
            console.log(e);
            res.status(500)
                .json({status: "fail", message:"Unable to complete transaction"})
        }
    },

}
