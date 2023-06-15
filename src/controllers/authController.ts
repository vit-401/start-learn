import UserService from "../service/userService";
import express from "express";
import {DataUserType} from "../models/user";
import {CodeResponsesEnum} from "../utils/constants";


export class AuthController {
  constructor(protected userService: UserService) {
    this.userService = userService;
  }

  async login(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const {email, password} = req.body;
      const deviceId = req.headers['user-agent'];
      const user = await this.userService.authenticate(email, password, deviceId, req.ip, deviceId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async refreshToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const {email, refreshToken} = req.body;

      const user = await this.userService.refreshJWT(email, refreshToken);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async logout(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const {email} = req.body;
      const user = await this.userService.logout(email);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async confirmEmail(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const user = await this.userService.confirmEmail(req.params.confirmationCode);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async recoveryPassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const {email, password} = req.body;
      const user = await this.userService.recoveryPassword(email, password);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async registration(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const {email, password} = req.body;
      const newUser: DataUserType = {email, password} as DataUserType;
      const user = await this.userService.createUser(newUser);
      res.status(CodeResponsesEnum.CREATED).json(user);
    } catch (err) {
      next(err);
    }
  }
}