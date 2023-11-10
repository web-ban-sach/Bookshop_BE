import express from "express";
import { register, login, changePassword } from "../controllers/auth.controller";
import { authenticateToken } from "../middlewares/authenticateToken";

const authRouter = express.Router()

authRouter.post("/login", login)
authRouter.post("/register", register)
authRouter.put("/change-password/:id", authenticateToken, changePassword)

export default authRouter
