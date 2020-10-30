// import {startAPI} from './api';
import { startMediaServer } from './media_api';

const main = async () => {
	await startMediaServer()
	// startAPI();
};

main().catch((e) => {
	console.log('Run error', e);
});
