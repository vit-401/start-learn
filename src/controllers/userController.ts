import UserService from "../service/userService";
import express from "express";
import {CodeResponsesEnum} from "../utils/constants";

export class UserController {
  constructor(protected userService: UserService) {
  }

  async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const {id} = req.params;

      const user = await this.userService.delete(id);
      res.json(user).status(CodeResponsesEnum.SUCCESS);
    } catch (err) {
      next(err);
    }
  }
}