import express from 'express'
import * as controllers from '../../controllers/book/category.controller'

const categoryRouter = express.Router()

categoryRouter.get("/", controllers.getCategories)
categoryRouter.get("/:id", controllers.getCategoryById)
categoryRouter.post("/add", controllers.addCategory)
categoryRouter.put("/update/:id", controllers.updateCategory)
categoryRouter.delete("/remove/:id", controllers.removeCategory)

export default categoryRouter
