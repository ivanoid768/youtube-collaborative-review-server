import { Router } from "express";
import { nanoid } from "nanoid";
import { IUser, users } from "../db";
import { generateId } from "./id_generator";

const router = Router();

interface ICreateRoomInput {
	accessKey?: string;
	userNickname?: string;
}

router.post<any, {roomId: string, accessKey: string}, ICreateRoomInput>('/create', async (req, res) => {
	const input = req.body;

	let user = createUserIfNotExists(input.accessKey, input.userNickname)

	return res.status(201).send({ roomId: generateId(), accessKey: user.accessKey })
});

router.post<{id: string}, {roomId: string, accessKey: string}, ICreateRoomInput>('/:id', async (req, res) => {
	const input = req.body;

	let user = createUserIfNotExists(input.accessKey, input.userNickname)

	return res.status(200).send({ roomId: req.params.id, accessKey: user.accessKey })
});

function createUserIfNotExists(accessKey?: string, nickname?: string) {
	if (!accessKey) {
		accessKey = generateId()
		users.set(accessKey, { accessKey: accessKey, nickname: nickname || 'guest_' + nanoid(4), id: generateId() })

		return users.get(accessKey) as IUser;
	}

	let user = users.get(accessKey)

	if (!user) {
		accessKey = generateId()
		users.set(accessKey, { accessKey: accessKey, nickname: nickname || 'guest_' + nanoid(4), id: generateId() })

		return users.get(accessKey) as IUser;
	}

	return user;
}

export { router as RoomRouter }
