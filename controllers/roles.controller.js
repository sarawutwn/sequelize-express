const { Roles, Users } = require("../models/index.model");

const router = require("express").Router();

router.post("/create", async(req, res) => {
    try {
        const response = await Roles.create({name: "students"});
        res.json(response)
    }catch(err) {
        res.status(500).json(err.message)
    }
})

router.get('/get-info/:id', async(req, res) => {
    try {
        const response = await Roles.findOne({where: {id: req.params.id}, include: {model: Users}})
        res.json(response)
    }catch(err) {
        res.status(500).json(err.message)
    }
})

module.exports = router;