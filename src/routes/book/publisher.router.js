import express from 'express'
import * as controllers from '../../controllers/book/publisher.controller'

const publisherRouter = express.Router()

publisherRouter.get("/", controllers.getPublishers)
publisherRouter.get("/:id", controllers.getPublisherById)
publisherRouter.post("/add", controllers.addPublisher)
publisherRouter.put("/update/:id", controllers.updatePublisher)
publisherRouter.delete("/remove/:id", controllers.removePublisher)

export default publisherRouter
