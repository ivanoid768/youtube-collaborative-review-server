import { Socket } from "socket.io";

enum PlayerEventType {
    START = 'START',
    STOP = 'STOP',
    VOLUME_UP = 'VOLUME_UP',
    VOLUME_DOWN = 'VOLUME_DOWN',
    SEEK_FORWARD = 'SEEK_FORWARD',
    SEEK_BACKWARD = 'SEEK_BACKWARD',
}

interface IPlayerEvent {
    type: PlayerEventType;
    value?: number | string; 
}

export function playerIORouter(socket: Socket) {
    socket.on(`user-player-event`, (roomId: string, userId: string, playerEvent: IPlayerEvent) => {
        socket.to(roomId).broadcast.emit('roommate-player-event', userId, playerEvent)
    })
}
