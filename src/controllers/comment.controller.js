import { commentSchema } from "../helper/comment.schema"
import Comment from "../models/comment.model"

export const getByBookId = async (req, res) => {
    try {
        const id = req.params.id
        const comment = await Comment.find({ book_id: id })

        if (!comment) {
            return res.status(200).json({
                message: "Chưa có bình luận"
            })
        }
        return res.status(200).json({
            message: "Tải bình luận thành công",
            data: comment
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const create = async (req, res) => {
    try {
        const { user_id, book_id, description, rate } = req.body
        const { error } = await commentSchema.validateAsync(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }

        const comment = await Comment.create({
            user_id, book_id, description, rate
        })
        if (!comment) {
            return res.status(400).json({
                message: "Thêm bình luận không thành công"
            })
        }
        return res.status(200).json({
            message: 'Thêm bình luận thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id
        const comment = await Comment.findById(id)

        if (!comment) {
            return res.status(404).json({
                message: "Không tìm thấy bình luận"
            })
        }
        const newComment = {
            user_id: comment?.user_id?._id.toString(),
            book_id: comment?.book_id?._id.toString(),
            description: req.body?.description || comment?.description,
            rate: req.body?.rate || comment?.rate
        }
        const { error } = await commentSchema.validateAsync(newComment, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const commentUpdated = await Comment.findByIdAndUpdate(id, newComment)
        if (!commentUpdated) {
            return res.status(400).json({
                message: "Cập nhật bình luận không thành công"
            })
        }
        return res.status(200).json({
            message: 'Cập nhật bình luận thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.params.id
        if (id) {
            const removed = await Comment.findByIdAndDelete(id)
            if (!removed) {
                return res.status(400).json({
                    message: "Không tìm thấy bình luận"
                })
            }
            return res.status(200).json({
                message: 'Xóa bình luận thành công'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
