import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { customAlphabet, urlAlphabet, } from 'nanoid';
import { PeerServer } from 'peer';

export const startPeerToPeerServer = async () => {
    const app = express()
    const server = createServer(app)
    const io = new Server(server)
    const nanoid = customAlphabet(urlAlphabet, 21)

    const peerServer = PeerServer({ port: 9001 });

    peerServer.on('error', error => {
        console.log('peer_error', error.message);
    })

    app.set('view engine', 'ejs')
    app.use(express.static('public'))

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

    server.listen(4001, () => {
        console.log('server...', 4001);
    })
}
