import express from "express";
import { createBook } from "../../controllers/book/book.controller";
import uploadCloud from "../../middlewares/uploadCloud"

const bookRouter = express.Router()

bookRouter.post("/add", uploadCloud.single('thumbnail'), createBook)

export default bookRouter
