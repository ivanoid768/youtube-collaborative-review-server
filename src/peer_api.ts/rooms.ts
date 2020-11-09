import { Router } from "express";
import { nanoid } from "nanoid";
import { users } from "../db";
import { generateId } from "./id_generator";

const router = Router();

interface ICreateRoomInput {
	userId?: string;
	userNickname?: string;
}

router.post<any, any, ICreateRoomInput>('/create', async (req, res) => {
	const input = req.body;
	let userId = input.userId;

	createUserIfNotExists(userId, input.userNickname)

	return res.status(201).send({ roomId: generateId() })
});

router.post<{id: string}, any, ICreateRoomInput>('/:id', async (req, res) => {
	const input = req.body;
	let userId = input.userId;

	createUserIfNotExists(userId, input.userNickname)

	return res.status(200).send({ roomId: req.params.id })
});

function createUserIfNotExists(userId?: string, nickname?: string) {
	if (!userId) {
		userId = generateId()
		users.set(userId, { nickname: nickname || 'guest_' + nanoid(4) })

		return users.get(userId)
	}

	let user = users.get(userId)

	if (!user) {
		userId = generateId()
		users.set(userId, { nickname: nickname || 'guest_' + nanoid(4) })

		return users.get(userId)
	}

	return user;
}

export { router as RoomRouter }
