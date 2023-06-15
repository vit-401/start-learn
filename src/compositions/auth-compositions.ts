import UserRepository from "../repository/userRepository";
import UserService from "../service/userService";
import {AuthController} from "../controllers/authController";


const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const authController = new AuthController(userService);