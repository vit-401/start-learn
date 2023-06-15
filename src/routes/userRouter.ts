import express from "express";
import UserService from "../service/userService";
import {CodeResponsesEnum} from "../utils/constants";


export function userRouter(userService: UserService) {
  const router = express.Router();

  router.delete('/:id', async (req, res, next) => {
    try {
      const {id} = req.params;
      const deviceId = req.headers['user-agent'];

      const user = await userService.delete(id);
      res.json(user).status(CodeResponsesEnum.SUCCESS);
    } catch (err) {
      next(err);
    }
  });


  return router;
}

