import express from 'express'
import { getAuthors, getAuthorById, addAuthor, updateAuthor, removeAuthor } from '../../controllers/book/author.controller'

const authorRouter = express.Router()

authorRouter.get("/", getAuthors)
authorRouter.get("/:id", getAuthorById)
authorRouter.post("/add", addAuthor)
authorRouter.put("/update/:id", updateAuthor)
authorRouter.delete("/remove/:id", removeAuthor)

export default authorRouter
