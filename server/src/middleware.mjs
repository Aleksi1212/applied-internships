import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({ message: 'Unauthorized', type: 'error' })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'token expired', type: 'error' })

        req.user = user
        next()
    })
}

export default authenticateToken