import express from 'express'
import { getPublishers, getPublisherById, addPublisher, updatePublisher, removePublisher } from '../../controllers/book/publisher.controller'

const publisherRouter = express.Router()

publisherRouter.get("/", getPublishers)
publisherRouter.get("/:id", getPublisherById)
publisherRouter.post("/add", addPublisher)
publisherRouter.put("/update/:id", updatePublisher)
publisherRouter.delete("/remove/:id", removePublisher)

export default publisherRouter
