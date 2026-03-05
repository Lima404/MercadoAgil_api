import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/', UserController.findByEmail);
userRouter.post('/', UserController.create);

export { userRouter };
