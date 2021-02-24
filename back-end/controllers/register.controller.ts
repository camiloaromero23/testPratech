import * as Register from '../models/register.model';
import { RegisterModel } from '../models/register.model';
import { Request, Response } from 'express';

export const createRegister = (req: Request, res: Response) => {
	const register: Partial<RegisterModel> = { ...req.body };
	let registerId: string;

	Register.createRegister(register)
		.then((response) => {
			registerId = '' + response.insertedId;
			return res.json({
				message: 'Register created successfully',
				registerId,
			});
		})
		.catch(() => {
			return res.status(404).json({
				error: true,
				message: 'Error creating register',
			});
		});
};

export const getRegisterById = (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		Register.fetchRegisterById(id)
			.then((register) => {
				if (register) {
					return res.json({
						error: false,
						register,
					});
				}
				throw 'Register Not Found';
			})
			.catch(() => {
				return res.status(404).json({
					error: true,
					message: 'Register Not Found',
				});
			});
	} catch {
		return res.status(404).json({
			error: true,
			message: 'Register Not Found',
		});
	}
};

export const getAllRegisters = (req: Request, res: Response) => {
	Register.fetchAllRegisters()
		.then((registers) => {
			return res.json({
				registers,
				error: false,
			});
		})
		.catch(() => {
			return res.status(404).json({
				error: true,
				message: 'An error occurred',
			});
		});
};

export const updateRegister = (req: Request, res: Response) => {
	const id = req.params.id;

	try {
		Register.updateRegister(id, { ...req.body })
			.then((response) => {
				if (response.result.nModified > 0) {
					return res.json({
						error: false,
						message: 'Register Updated Successfully',
					});
				}
			})
			.catch(() => {
				return res.status(404).json({
					error: true,
					message: 'Register Not Found',
				});
			});
	} catch {
		return res.status(404).json({
			error: true,
			message: 'Register Not Found',
		});
	}
};

export const deleteRegister = (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		Register.deleteRegister(id)
			.then((response) => {
				if (response.deletedCount! > 0) {
					return res.json({
						error: false,
						message: 'Register deleted successfully',
					});
				}
				throw 'Register Not Found';
			})
			.catch(() => {
				return res.status(404).json({
					error: true,
					message: 'Register Not Found',
				});
			});
	} catch {
		return res.status(404).json({
			error: true,
			message: 'Register Not Found',
		});
	}
};
