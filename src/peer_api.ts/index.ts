import express, { json, urlencoded } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { ExpressPeerServer } from 'peer';
import { env } from 'process';
import cors, { CorsOptions } from 'cors';
import { RoomRouter } from './rooms';
import { users } from '../db';
import { playerIORouter } from './player';
import { searchIORouter } from './search';

export const startPeerToPeerServer = async () => {
    const app = express()
    const server = createServer(app)
    const io = new Server(server)

    app.use(urlencoded({ extended: true }));
    app.use(json());

    const corsOptions: CorsOptions = { origin: env.CORS_ORIGIN || '*' };
    app.use(cors(corsOptions))

    app.set('view engine', 'ejs')
    app.use(express.static('public'))

    const peerServer = ExpressPeerServer(server);

    peerServer.on('error', error => {
        console.log('peer_error', error.message);
    })

    app.use('/peerjs', peerServer);

    app.use('/room', RoomRouter)

    io.on('connection', (socket: Socket) => {
        console.log('conn: ', socket.id);

        playerIORouter(socket)
        searchIORouter(socket)

        socket.on('join-room', (roomId, peerId, accessKey: string) => {
            console.log(roomId, peerId, accessKey);

            let user = users.get(accessKey)
            let userData = { ...user, accessKey: '' }

            socket.join(roomId)
            socket.to(roomId).broadcast.emit('user-connected', peerId, userData)

            socket.on('disconnect', () => {
                socket.to(roomId).broadcast.emit('user-disconnected', peerId, userData)
            })
        })
    })

    const THE_PORT = 4001;
    server.listen(THE_PORT, () => {
        console.log(`http://localhost:${THE_PORT} is listening...`);
    })
}

// ts-node-dev ver. 1.0.0 (using ts-node ver. 9.0.0, typescript ver. 3.9.7)
