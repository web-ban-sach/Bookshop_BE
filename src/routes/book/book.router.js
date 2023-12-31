import express from "express";
import * as controllers from "../../controllers/book/book.controller";
import uploadCloud from "../../middlewares/uploadCloud"

const bookRouter = express.Router()

// router book
bookRouter.post("/add", controllers.createBook)
bookRouter.get("/read", controllers.getBooks)
bookRouter.get("/read/:id", controllers.getBookById)
bookRouter.put("/update/:id", controllers.updateBook)
bookRouter.delete("/remove/:id", controllers.removeBook)

// router search book
bookRouter.get("/search-book",controllers.searchBook)

export default bookRouter
