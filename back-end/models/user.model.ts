import { getDb } from '../util/database';

export interface UserModel {
	_id: string;
	password: string;
	salt?: string;
}

export const createUser = (user: UserModel) => {
	const db = getDb();
	return db.collection<UserModel>('users').insertOne(user);
};

export const fetchUser = (username: string) => {
	const db = getDb();
	return db
		.collection<UserModel>('users')
		.find({ _id: username })
		.next()
		.then((user) => {
			return user;
		});
};
