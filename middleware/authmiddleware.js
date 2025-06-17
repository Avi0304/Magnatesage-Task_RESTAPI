const jwt = require('jsonwebtoken');

const authmiddleware = async(req, res, next) => {
  
    const authHeader = req.header("Authorization");
    if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({message: "Access Denied. No token provided"});
    }

    const token = authHeader.split(' ')[1];

    try {
        const verfied = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verfied;
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid Token'})
    }
}



module.exports = authmiddleware;