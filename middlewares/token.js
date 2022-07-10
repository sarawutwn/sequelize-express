module.exports = (req, res, next) => {
    if(req.authorization) {
        
        next();
    }else {
        res.status(500).json({messge: "มึงไม่มีสิทธิ์"})
    }
}