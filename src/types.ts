interface IRoom {
	id: string;
	users: Map<string, IUser>;
	usersCount: number;
}

interface IUser {
	id: string;
	name: string;
}