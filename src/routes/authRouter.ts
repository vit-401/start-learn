import express from "express";
import {DataUserType} from "../models/user";
import UserService from "../service/userService";
import {CodeResponsesEnum} from "../utils/constants";


export function authRouter(userService: UserService) {
  const router = express.Router();

  router.post('/login', async (req, res, next) => {
    try {
      const {email, password} = req.body;
      const deviceId = req.headers['user-agent'];

      const user = await userService.authenticate(email, password, deviceId, req.ip, deviceId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  });

  router.post('/refresh-token', async (req, res, next) => {
    try {
      const {email, refreshToken} = req.body;

      const user = await userService.refreshJWT(email, refreshToken);
      res.json(user);
    } catch (err) {
      next(err);
    }
  })


  router.post('/logout', async (req, res, next) => {
    try {
      const {email} = req.body;
      const user = await userService.logout(email);
      res.json(user);
    } catch (err) {
      next(err);
    }
  });


  router.get(`/confirmation/:confirmationCode`, async (req, res, next) => {
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
      const user = await userService.recoveryPassword(email, password);
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
      res.status(CodeResponsesEnum.CREATED).json(user);
    } catch (err) {
      next(err);
    }
  });

  return router;
}

