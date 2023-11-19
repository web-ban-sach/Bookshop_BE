import * as controller from "../controllers/cart.controller"
import express from "express"

const cartRouter = express.Router()

cartRouter.get("/:id", controller.getByUserId)
cartRouter.post("/add", controller.create)
cartRouter.put("/update/:id", controller.update)
cartRouter.delete("/remove/:id", controller.remove)

export default cartRouter
