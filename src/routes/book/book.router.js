import express from "express";
import * as controllers from "../../controllers/book/book.controller";
import uploadCloud from "../../middlewares/uploadCloud"

const bookRouter = express.Router()
const bookDetailRouter = express.Router()

// router book
bookRouter.post("/add", uploadCloud.single('thumbnail'), controllers.createBook)
bookRouter.get("/", controllers.getBooks)
bookRouter.get("/:id", controllers.getBookById)
bookRouter.put("/update/:id", uploadCloud.single('thumbnail'), controllers.updateBook)
bookRouter.delete("/remove/:id", controllers.removeBook)

// router book detail
bookDetailRouter.post("/add", controllers.createBookDetail)
bookDetailRouter.get("/", controllers.getBooksDetail)
bookDetailRouter.get("/:id", controllers.getBookDetailById)
bookDetailRouter.put("/update/:id", controllers.updateBookDetail)
bookDetailRouter.delete("/remove/:id", controllers.removeBookDetail)

export { bookRouter, bookDetailRouter }
