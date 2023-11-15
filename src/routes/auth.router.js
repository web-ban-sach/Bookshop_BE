import express from "express";
import * as controllers from "../controllers/auth.controller";
import { authenticateToken } from "../middlewares/authenticateToken";

const authRouter = express.Router()

authRouter.post("/login", controllers.login)
authRouter.post("/register", controllers.register)
authRouter.put("/change-password/:id", authenticateToken, controllers.changePassword)
authRouter.get("/decode", controllers.decodeToken)

export default authRouter
