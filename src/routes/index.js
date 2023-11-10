import express from 'express'
import authRouter from './auth.router'
import authorRouter from './book/author.router'
import categoryRouter from './book/category.router'
import publisherRouter from './book/publisher.router'

const router = express.Router()

router.use("/auth", authRouter)
router.use("/author", authorRouter)
router.use("/category", categoryRouter)
router.use("/publisher", publisherRouter)

export default router
