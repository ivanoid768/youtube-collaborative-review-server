// import {startAPI} from './api';
// import { startMediaServer } from './media_api';
import { startPeerToPeerServer } from "./peer_api.ts";

const main = async () => {
	// await startMediaServer()
	// startAPI();
	await startPeerToPeerServer()
};

main().catch((e) => {
	console.log('Run error', e);
});
