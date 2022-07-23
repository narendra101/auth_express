import  express  from "express";
import { deleteAllUsersController, getAllUsersController, homeConrtoller, loginController, registerController } from "../controllers/userController.js";
import { authenticate, authUser } from "../utils/utils.js";

const userRoutes = express.Router()

userRoutes.post('/register', registerController)

userRoutes.delete('/all', deleteAllUsersController)

userRoutes.get('/', getAllUsersController)

userRoutes.post('/login', authUser, loginController)

userRoutes.get('/home', authenticate, homeConrtoller)
export default userRoutes