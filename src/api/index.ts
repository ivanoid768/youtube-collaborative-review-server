import express, { urlencoded, json } from 'express';
import { roomRouter } from './roomRouter';

export const startAPI = () => {
	const app = express();

	app.use(urlencoded({ extended: true }));
	app.use(json());

	app.use('/', roomRouter);

	app.listen(4000, () => {
		console.log('Bot API listening on port 4000!');
	});
};
