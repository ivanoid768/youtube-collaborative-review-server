interface IRoom {
	id: string;
	users: Map<string, IUser>;
	usersCount: number;
	channel?: string;
}

interface IUser {
	id: string;
	name: string;
	channel?: string;
}