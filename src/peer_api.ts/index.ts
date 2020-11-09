import express, { json, urlencoded } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { customAlphabet, urlAlphabet, } from 'nanoid';
import { ExpressPeerServer } from 'peer';
import { env } from 'process';
import cors, { CorsOptions } from 'cors';

export const startPeerToPeerServer = async () => {
    const app = express()
    const server = createServer(app)
    const io = new Server(server)
    const nanoid = customAlphabet(urlAlphabet, 21)

    app.use(urlencoded({extended: true}));
    app.use(json());

    const corsOptions: CorsOptions = {origin: env.CORS_ORIGIN || '*'};
    app.use(cors(corsOptions))

    app.set('view engine', 'ejs')
    app.use(express.static('public'))

    const peerServer = ExpressPeerServer(server);

    peerServer.on('error', error => {
        console.log('peer_error', error.message);
    })

    app.use('/peerjs', peerServer);

    app.get('/', (_req, res) => {
        res.redirect(`/${nanoid()}`)
    })

    app.get('/:room', (req, res) => {
        console.log('roomId', req.params.room);

        res.render('room', { roomId: req.params.room })
    })

    io.on('connection', (socket: Socket) => {
        console.log('conn: ', socket.id);

        socket.on('join-room', (roomId, userId) => {
            console.log(roomId, userId);

            socket.join(roomId)
            socket.to(roomId).broadcast.emit('user-connected', userId)

            socket.on('disconnect', () => {
                socket.to(roomId).broadcast.emit('user-disconnected', userId)
            })
        })
    })

    let the_port = 4001;

    server.listen(the_port, () => {
        console.log(`http://localhost:${the_port} is listening...`);
    })
}

// ts-node-dev ver. 1.0.0 (using ts-node ver. 9.0.0, typescript ver. 3.9.7)
