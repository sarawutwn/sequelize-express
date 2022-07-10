const router = require("express").Router();
const { Users, Roles } = require("../models/index.model");
const { body, validationResult } = require("express-validator");
const auth = require("../middlewares/token")

router.post("/create", 
body("firstname").notEmpty(),
body("lastname").notEmpty(),
body("email").notEmpty(),
body("password").notEmpty(),
body("roleId").notEmpty(),
auth,async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
        const response = await Users.create(req.body)
        res.json(response)
    }catch(err) {
        res.status(500).json(err.message);
    }
})

router.put("/update/:id", 
body("firstname").notEmpty(),
body("lastname").notEmpty(),
body("email").notEmpty(),
body("password").notEmpty(),
async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
        const response = await Users.update(req.body, {where: {id: req.params.id}});
        res.json(response)
    }catch(err) {
        res.status(500).json(err.message)
    }
})

router.get("/getAll", async(req, res) => {
    try {
        const response = await Users.findAll({ include: {model: Roles, where: {name: "students"}} });
        res.json(response)
    }catch(err) {
        res.status(500).json(err.message)
    }
})

router.get("/getById/:id", async(req, res) => {
    try {
        const response = await Users.findByPk(req.params.id, { include: {model: Roles}})
        res.json(response)
    }catch(err) {
        res.status(500).json(err.message)
    }
})

router.delete("/destroy/:id", (req, res) => {
    Users.findOne({where: {id: req.params.id}}).then(async(result) => {
        try {
            const response = await Users.destroy({where: {id: req.params.id}});
            res.json({ message: "Delete success นะจ๊ะ"})
        }catch(err) {
            res.status(500).json(err.message)
        }
    }).catch(err => {
        res.status(500).json(err.message)
    })
    // if(result === null) {
    //     res.status(404).json({message: "Not found user ที่จะลบนะ๗ีะ"})
    //     return
    // }
    // try {
    //     const response = await Users.destroy({where: {id: req.params.id}})
    //     res.json(response)
    // }catch(err) {
    //     res.status(500).json(err.message)
    // }
})



module.exports = router;