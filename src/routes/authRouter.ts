import express from "express";
import {container} from "../root-compositions";
import {AuthController} from "../controllers/authController";


export function authRouter() {
  const authController = container.resolve(AuthController)

  const router = express.Router();
  router.post('/login', authController.login.bind(authController));
  router.post('/refresh-token', authController.refreshToken.bind(authController))
  router.post('/logout', authController.logout.bind(authController));
  router.get(`/confirmation/:confirmationCode`, authController.confirmEmail.bind(authController));
  router.post('/recovery-password', authController.recoveryPassword.bind(authController));
  router.post('/register', authController.registration.bind(authController));

  return router;
}

