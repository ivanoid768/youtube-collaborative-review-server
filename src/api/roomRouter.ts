import { Router } from 'express';
import { nanoid } from 'nanoid';
import { rooms } from 'src/db';

interface ICreateRoomInput {
	name: string;
}

interface ILeaveRoomInput {
	userId: string;
}

const router = Router();

router.post('/room', async (req, res) => {
	const input = req.body as ICreateRoomInput;

	let newUser: IUser = {
		name: input.name,
		id: nanoid(),
	}

	let room: IRoom = {
		id: nanoid(),
		users: new Map([
			[newUser.id, newUser]
		]),
		usersCount: 1,
	}

	rooms.set(room.id, room)

	return res.status(200).send(room)
});

router.get('/room/:roomId', async (req, res) => {
	const roomId = req.params.roomId as string;

	let room = rooms.get(roomId)
	if (!room) {
		return res.status(400).send(`no_room:${roomId}`)
	}

	return res.status(200).send(room)
})

router.post('/room/:roomId/leave', async (req, res) => {
	const roomId = req.params.roomId as string;
	const { userId } = req.body as ILeaveRoomInput;

	let room = rooms.get(roomId)
	if (!room) {
		return res.status(400).send(`no_room:${roomId}`)
	}

	room.usersCount -= 1;
	room.users.delete(userId)

	rooms.set(room.id, room) // TODO: reSet required?

	return res.status(200).send(room)
});

export { router as roomRouter };
