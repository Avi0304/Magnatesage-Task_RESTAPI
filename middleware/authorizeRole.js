const authorizeRole = (allowedRoles = ['admin']) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({message: "Accessed Denied. Insufficient permissions."})
        }
        next();
    }
}

module.exports = authorizeRole;