import express from 'express';
import dotenv from 'dotenv';
import { mongoConnect } from './util/database';
import { corsMiddleware } from './middleware/cors';
import { registersRouter } from './routes/register.routes';
import { usersRouter } from './routes/user.routes';

dotenv.config({ path: '../.env' });
const {
	DB_URL,
	DB_USER,
	DB_PASSWORD,
	DB_HOST,
	DB_PORT,
	DB_NAME,
	BACKEND_PORT,
} = process.env;

const mongoUri = `${DB_URL}${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

const PORT = BACKEND_PORT || 5000;

const app = express();

app.use(express.json());

app.use(corsMiddleware);

app.use('/registers', registersRouter);
app.use('/users', usersRouter);

mongoConnect(mongoUri, DB_USER!, DB_PASSWORD!, () => {
	app.listen(PORT, () => {
		console.log(`Server is running at https://localhost:${PORT}`);
	});
});
