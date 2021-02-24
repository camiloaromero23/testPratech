import { Router } from 'express';
import * as registerController from '../controllers/register.controller';
import { authenticateJWT } from '../middleware/jwt';

export const registersRouter = Router();

registersRouter.post('/', authenticateJWT, registerController.createRegister);
registersRouter.get(
	'/:id',
	authenticateJWT,
	registerController.getRegisterById,
);
registersRouter.get('/', authenticateJWT, registerController.getAllRegisters);
registersRouter.put('/:id', authenticateJWT, registerController.updateRegister);
registersRouter.delete(
	'/:id',
	authenticateJWT,
	registerController.deleteRegister,
);
