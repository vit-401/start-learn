import express from "express";
import {DataUserType} from "../models/user";
import UserService from "../service/userService";


export function authRouter(userService: UserService) {
  const router = express.Router();

  router.post('/login', async (req, res, next) => {
    try {
      const {email, password} = req.body;
      const user = await userService.authenticate(email, password);
      res.json(user);
    } catch (err) {
      next(err);
    }
  });



  router.post('/logout', async (req, res, next) => {
    try {
      const {email} = req.body;
      const user = await userService.logout(email);
      res.json(user);
    } catch (err) {
      next(err);
    }
  } );




  router.get(`/confirmation/:confirmationCode`, async (req, res, next) => {
    console.log("confirmationCode", req.params.confirmationCode)
    try {
      const user = await userService.confirmEmail(req.params.confirmationCode);
      res.json(user);
    } catch (err) {
      next(err);
    }
  });


  router.post('/recovery-password', async (req, res, next) => {
    try {
      const {email, password} = req.body;
const user = await userService.recoveryPassword(email , password);
      res.json(user);
    } catch (err) {
      next(err);
    }
  });

  router.post('/register', async (req, res, next) => {
    try {
      const {email, password} = req.body;
      const newUser: DataUserType = {email, password} as DataUserType;
      const user = await userService.createUser(newUser);
      res.json(user);
    } catch (err) {
      next(err);
    }
  });

  return router;
}

