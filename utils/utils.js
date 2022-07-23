import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from "jsonwebtoken";

export const hashPassword = async(password) => {
    const SALT = Number(process.env.SALT)
    const hashedPassword = await bcrypt.hash(password, SALT)
    return hashedPassword
}

export const authUser = async (req, res, next) => {
    try {       
        const {username, password} = req.body

        if(!username){
            res.status(400).json({error: 'Username Is Required'})            
        }
        if(!password){
            res.status(400).json({error: 'Password Is Required'})
        }

        let user = await User.findOne({username: req.body.username})
        if(!user){
            return res.status(400).json({error: "Invalid User"})
        }

        const matched = await bcrypt.compare(password, user.password)
        if(matched){
            req.user = user
            next()
        } else {
            return res.status(400).json({message: "Password Wrong"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).json('auth error')
    }
}

export const generateAuthToken = (user) => {
    try {
        return jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: '60s'})    
    } catch (error) {
        console.log(error)
        throw error
    }    
}
export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) res.status(400).json('missing token')                   
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY)                
        req.user = user
        next()          
    } catch (error) {        
        res.status(400).json(error.message)       
    }
}