import { Router } from 'express';

interface ICreateRoomInput {
	
}

const router = Router();

router.post('/room', async (req, res) => {
	const input = req.body as ICreateRoomInput;

	return res.status(200).send(input)
});

export { router as roomRouter };
