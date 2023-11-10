import express from 'express'
import { getCategories, getCategoryById, addCategory, updateCategory, removeCategory } from '../../controllers/book/category.controller'

const categoryRouter = express.Router()

categoryRouter.get("/", getCategories)
categoryRouter.get("/:id", getCategoryById)
categoryRouter.post("/add", addCategory)
categoryRouter.put("/update/:id", updateCategory)
categoryRouter.delete("/remove/:id", removeCategory)

export default categoryRouter
