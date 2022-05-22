import conf from '../../app.config'
import jwt from "jsonwebtoken";

const config = conf.default
const authCookieName = 't'

export const isAdmin = (req) => {
    try {
        const token = req.state[authCookieName]
        const decoded = jwt.verify(token, config.secret)
        return decoded
    } catch (err) {
        return null
    }
}

export const authenticated = (exec) => {
    const f = (req, h) => {
        const decoded = isAdmin(req)
        if(decoded) return exec(req,h)
        else return h.response("").code(404)
    }

    return f
}