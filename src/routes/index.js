import express from 'express'
import authRouter from './auth.router'
import authorRouter from './book/author.router'
import categoryRouter from './book/category.router'
import publisherRouter from './book/publisher.router'
import bookRouter from './book/book.router'
import commentRouter from './comment.router'
import cartRouter from './cart.router'

const router = express.Router()

router.use("/auth", authRouter)
router.use("/author", authorRouter)
router.use("/category", categoryRouter)
router.use("/publisher", publisherRouter)
router.use("/book", bookRouter)
router.use("/comment", commentRouter)
router.use("/cart", cartRouter)

export default router
