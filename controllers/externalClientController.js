const {SiClient, SiMainContent} = require('../services/client/SiClient')
const fs = require('fs').promises
const {
    general,
} = require("../services/api");

module.exports = {
    exposeApi: async (req, res, next)=>{
        let dto = await new general.DTO().build();
        res.status(200).send(dto);
    }
}