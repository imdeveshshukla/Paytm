const jwt = require("jsonwebtoken");
const JWT_TOKEN = require("./config");

function authenticate(req,res,next){
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token,JWT_TOKEN,(err,decoded)=>{
        if(err || !decoded.userId)
        {
            return res.status(401).json({
                message:"Invalid Token"
            })
        }
        req.userId = decoded.userId;
        next();
    });

    
}

module.exports = {
    authenticate 
}