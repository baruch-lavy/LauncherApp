import { asyncLocalSotorage } from "./setupAls.middleware"

export function requireAuth(req,res,next) {
    const { loggedinUser } = asyncLocalSotorage.getStore()
    
    if (!loggedinUser) return res.status(401).send('Not authorise')

    req.loggedinUser = loggedinUser
    next()
}