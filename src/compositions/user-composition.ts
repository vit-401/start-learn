import UserRepository from "../repository/userRepository";
import UserService from "../service/userService";

import {UserController} from "../controllers/userController";

const userRepo = new UserRepository();
const userService = new UserService(userRepo);

export const userController = new UserController(userService);