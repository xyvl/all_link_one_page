import { Router } from "express";
import { userController } from "../controller/user.controller";

const router = Router()

router.post('/signIn', userController.signIn)
router.post('/signUp', userController.signUp)

export const userRouter = router