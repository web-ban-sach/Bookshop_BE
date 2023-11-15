import express from 'express'
import authRouter from './auth.router'
import authorRouter from './book/author.router'
import categoryRouter from './book/category.router'
import publisherRouter from './book/publisher.router'
import bookRouter from './book/book.router'

const router = express.Router()

router.use("/auth", authRouter)
router.use("/author", authorRouter)
router.use("/category", categoryRouter)
router.use("/publisher", publisherRouter)
router.use("/book", bookRouter)

export default router
