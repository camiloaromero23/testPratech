import { Db, MongoClient } from 'mongodb';

let _db: Db;

export const mongoConnect = (
	mongoUri: string,
	user: string,
	password: string,
	callback: Function,
) => {
	MongoClient.connect(mongoUri, { useUnifiedTopology: true })
		.then((client) => {
			console.log('Connected to DB');
			_db = client.db();

			callback();
		})
		.catch((error) => {
			console.log(error);
			throw error;
		});
};

export const getDb = () => {
	if (_db) {
		return _db;
	}
	throw 'No database found!';
};
