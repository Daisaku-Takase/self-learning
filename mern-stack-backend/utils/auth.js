// utils/auth.js

const jwt = require("jsonwebtoken")
const secret_key = "mern-market"

const auth = async(req, res, next) => {
    if(req.method === "GET"){
        return next()
    }

    // const token = await req.headers.authorization.split(" ")[1]
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQHlhcmltYXN1a2EuY29tIiwiaWF0IjoxNjk4NTQwNjA3LCJleHAiOjE2OTg2MjM0MDd9.aMxJjJf6W8SAF6li-lNu_O9UH3SzpcsdDhGsve9WS8s"
    if(!token){
        return res.status(400).json({message: "Token does not exist."})
    }
    try{
        const decoded = jwt.verify(token, secret_key)
        req.body.email = decoded.email
        return next()
    }catch(err){
        return res.status(400).json({message: "Token is invalid. Please login."})
    }
}

module.exports = auth