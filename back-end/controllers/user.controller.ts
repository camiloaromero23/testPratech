import * as User from '../models/user.model';
import { UserModel } from '../models/user.model';
import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { encrypt } from '../util/encrypt';

export const createUser = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	const { salt, hash } = await encrypt(password.toString());
	const user: UserModel = { _id: username, password: hash, salt };
	let userId: string;

	User.createUser(user)
		.then((response) => {
			userId = '' + response.insertedId;
			return res.json({
				message: 'User created successfully',
				userId,
			});
		})
		.catch(() => {
			return res.status(404).json({
				error: true,
				message: 'Error creating user',
			});
		});
};

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	const userToLogin: UserModel = {
		_id: username,
		password,
	};
	try {
		User.fetchUser(userToLogin._id)
			.then(async (user) => {
				if (!user) {
					throw 'User Not Found';
				}

				const { salt } = user;
				const { hash } = await encrypt(password.toString(), salt);
				if (user.password.toString() === hash.toString()) {
					const accessToken = jsonwebtoken.sign(
						{ username: user._id },
						process.env.ACCESS_TOKEN_SECRET!,
					);
					return res.json({
						error: false,
						accessToken,
					});
				}
				throw 'Invalid user or password';
			})
			.catch(() => {
				return res.status(404).json({
					error: true,
					message: 'Invalid user or password',
				});
			});
	} catch {
		return res.status(404).json({
			error: true,
			message: 'User Not Found',
		});
	}
};
