import { getDb } from '../util/database';
import mongodb from 'mongodb';

export interface RegisterModel {
	id: string;

	[propName: string]: any;
}

export const createRegister = (register: Partial<RegisterModel>) => {
	const db = getDb();
	return db
		.collection<Partial<RegisterModel>>('registers')
		.insertOne(register);
};

export const fetchAllRegisters = () => {
	const db = getDb();
	return db
		.collection<RegisterModel>('registers')
		.find()
		.toArray()
		.then((registers) => {
			return registers;
		});
};

export const fetchRegisterById = (registerId: string) => {
	const db = getDb();
	return db
		.collection<RegisterModel>('registers')
		.find({ _id: new mongodb.ObjectID(registerId) })
		.next()
		.then((register) => {
			return register;
		});
};

export const updateRegister = (
	registerId: string,
	updatedRegister: Partial<RegisterModel>,
) => {
	const db = getDb();
	return db
		.collection<RegisterModel>('registers')
		.updateOne(
			{ _id: new mongodb.ObjectId(registerId) },
			{ $set: updatedRegister },
		);
};

export const deleteRegister = (registerId: string) => {
	const db = getDb();
	return db
		.collection<RegisterModel>('registers')
		.deleteOne({ _id: new mongodb.ObjectID(registerId) });
};
