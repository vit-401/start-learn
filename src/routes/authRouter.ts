import express from "express";
import {User} from "../models/user";
import UserService from "../service/userService";


export function authRouter(userService: UserService) {
  const router = express.Router();

  router.post('/login', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await userService.authenticate(email, password);
      res.json(user);
    } catch (err) {
      next(err);
    }
  });

  router.post('/register', async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const newUser: User = { email, password } as User;
      const user = await userService.createUser(newUser);
      res.json(user);
    } catch (err) {
      next(err);
    }
  });

  return router;
}