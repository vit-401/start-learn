import express from "express";
import {container} from "../root-compositions";
import {UserController} from "../controllers/userController";


export function userRouter() {
  const router = express.Router();
const userController = container.resolve(UserController)

  router.delete('/:id', userController.delete.bind(userController));


  return router;
}

