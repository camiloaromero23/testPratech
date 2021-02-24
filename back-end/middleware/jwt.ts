import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

export const authenticateJWT = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];

		jsonwebtoken.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET!,
			(err, user) => {
				if (err) {
					return res.sendStatus(403);
				}

				next();
			},
		);
	} else {
		res.sendStatus(401);
	}
};
