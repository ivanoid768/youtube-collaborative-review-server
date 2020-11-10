import { Socket } from "socket.io";

enum SearchEventType {
    SEARCH_REQUEST = 'SEARCH_REQUEST',
    VIDEO_SELECTED = 'VIDEO_SELECTED',
}

interface ISearchEvent {
    type: SearchEventType;
    value: string;
}

export function searchIORouter(socket: Socket) {
    socket.on(`user-search-event`, (roomId: string, userId: string, playerEvent: ISearchEvent) => {
        socket.to(roomId).broadcast.emit('roommate-search-event', userId, playerEvent)
    })
}
