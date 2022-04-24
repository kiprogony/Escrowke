require('dotenv').config()
const jwt = require('jsonwebtoken');

module.exports=(req,res,next)=>{
    try {
        const decoded=jwt.verify(req.body.token,process.env.jwt_key)
        req.userData=decoded
        next()
    } catch (error) {
        return res.status(401).json({'Message':'Auth failed'})
    }

}