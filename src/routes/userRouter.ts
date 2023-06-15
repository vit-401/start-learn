import express from "express";
import {userController} from "../compositions/user-composition";


export function userRouter() {
  const router = express.Router();

  router.delete('/:id', userController.delete.bind(userController));


  return router;
}

