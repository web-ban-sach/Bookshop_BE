import express from 'express'
import * as controllers from '../../controllers/book/author.controller'

const authorRouter = express.Router()

authorRouter.get("/", controllers.getAuthors)
authorRouter.get("/:id", controllers.getAuthorById)
authorRouter.post("/add", controllers.addAuthor)
authorRouter.put("/update/:id", controllers.updateAuthor)
authorRouter.delete("/remove/:id", controllers.removeAuthor)

export default authorRouter
