const {general, SiMainContent} = require("../services");
const express = require('express')
const router = express.Router();

router.get('/', async (req, res, next)=>{
    let dto = await new general.DTO().build();
        let page = new general.PTO(dto)
        let data = new SiMainContent(page.basic.system, page.basic.os, page)
    res.status(200).send(data);
});

module.exports = router