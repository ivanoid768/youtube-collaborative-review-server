export const rooms: Map<string, IRoom> = new Map()

export interface IUser {
    id: string;
    accessKey: string;
    nickname: string;
}
export const users: Map<string, IUser> = new Map()
