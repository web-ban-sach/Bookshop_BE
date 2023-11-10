import express from 'express'
import authRouter from './auth.router'
import authorRouter from './book/author.router'

const router = express.Router()

router.use("/auth", authRouter)
router.use("/author", authorRouter)

export default router
