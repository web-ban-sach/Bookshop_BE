import express from "express";
import * as controllers from '../controllers/comment.controller'

const commentRouter = express.Router()

commentRouter.get("/:id", controllers.getByBookId)
commentRouter.post("/add", controllers.create)
commentRouter.put("/update/:id", controllers.update)
commentRouter.delete("/remove/:id", controllers.remove)

export default commentRouter
