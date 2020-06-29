import {startAPI} from './api';

const main = async () => {

	startAPI();
};

main().catch((e) => {
	console.log('Run error', e);
});
