import express from "express";
import * as controllers from "../../controllers/book/book.controller";
import uploadCloud from "../../middlewares/uploadCloud"

const bookRouter = express.Router()

// router book
bookRouter.post("/add", uploadCloud.single('thumbnail'), controllers.createBook)
bookRouter.get("/", controllers.getBooks)
bookRouter.get("/:id", controllers.getBookById)
bookRouter.put("/update/:id", uploadCloud.single('thumbnail'), controllers.updateBook)
bookRouter.delete("/remove/:id",controllers.removeBook)

// router book detail


export default bookRouter
