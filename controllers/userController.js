import User from "../models/User.js ";
import handleErrors from "../utils/handleErrors.js";
import { generateAuthToken, hashPassword } from "../utils/utils.js";


export const registerController = async (req, res) => {
    try {
        const userData = req.body
        const password = userData.password        
        const hashedPassword = await hashPassword(password)                
        const user = await User.create({...userData, password: hashedPassword})        
        return res.status(200).json({message: 'success', user: user})
    } catch (error) {
        console.log(`error: ${error.message}`)
        res.status(400).json(handleErrors(error))
    }
}
export const deleteAllUsersController = async (req, res) => {
    try {
        await User.deleteMany({})
        res.status(200).json({message: "Deleted All Data"})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const getAllUsersController = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const loginController = (req, res) => {
    try {
        const payload = {
            username: req.user.username,
            password: req.user.password
        }
        const token = generateAuthToken(payload)
        res.status(200).json({token: token, message: 'success'})
    } catch (error) {        
        res.status(400).json('not ok')
    }
}
export const homeConrtoller = (req, res) => {
    try {
        res.status(200).json("welcome")
    } catch (error) {
        res.status(400).json("something went wrong")
    }
}