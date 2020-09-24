const jwt = require('jsonwebtoken')

function restrict(){
    const authError = {
        message: "You are not permitted to enter"
    }

    return async(req, res, next) => {
        try{
            const token = req.cookies.token
            if(!token){
                return res.status(401).json(authError)
            }
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err){
                    return res.status(401).json(authError)
                }
                req.token = decoded
                if( decoded.user_role !== 2){
                    return res.status(403).json(authError)
                }
                next()
            })
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = restrict