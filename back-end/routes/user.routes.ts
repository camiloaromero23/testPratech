import { Router } from 'express';
import * as userController from '../controllers/user.controller';

export const usersRouter = Router();

usersRouter.post('/signup', userController.createUser);
usersRouter.post('/login', userController.login);
