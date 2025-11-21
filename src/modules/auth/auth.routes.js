import { multerCloudFunction } from '../../services/multerCloud.js';
import { allowedExtensions } from '../../utilities/allowedExtensions.js';
import * as userCon from './auth.controller.js';           
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/register', userCon.register);
userRouter.post('/login', userCon.login);
userRouter.get('/', userCon.getAllUsers);
userRouter.post('/add', userCon.addUser);
userRouter.put('/:id',multerCloudFunction(allowedExtensions.Image).single("image"), userCon.UpdateUser);
userRouter.delete('/:id', userCon.deleteUser);

export default userRouter;