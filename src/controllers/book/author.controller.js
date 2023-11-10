import Authors from "../../models/book/author.model";
import { authorSchema } from "../../helper/book.schema";

export const getAuthors = async (req, res) => {
    try {
        const data = await Authors.find()
        if (data.length === 0) {
            return res.status(300).json({
                message: "Danh sách tác giả trống"
            })
        }

        return res.status(200).json({
            message: 'Lấy danh sách tác giả thành công',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getAuthorById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Authors.findById(id)
        // Kiểm tra xem id có tồn tại không
        if (!data) {
            return res.status(404).json({
                message: 'Tác giả không tồn tại'
            })
        }

        return res.status(200).json({
            message: 'Lấy thông tin tác giả thành công',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const addAuthor = async (req, res) => {
    try {
        const { author_name, description } = req.body
        const { error } = await authorSchema.validateAsync(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message)
            return res.status(400).json({
                message: errors
            })
        }

        const author = await Authors.create({
            author_name: author_name,
            description: description
        })
        if (!author) {
            return res.status(400).json({
                message: "Thêm tác giả không thành công"
            })
        }

        return res.status(200).json({
            message: 'Thêm tác giả thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateAuthor = async (req, res) => {
    try {
        const author_id = req.params.id
        const { author_name, description } = req.body
        const { error } = await authorSchema.validateAsync(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message)
            return res.status(400).json({
                message: errors
            })
        }

        const author = await Authors.findByIdAndUpdate(author_id, {
            author_name: author_name,
            description: description
        })
        if (!author) {
            return res.status(400).json({
                message: "Tác giả không tồn tại"
            })
        }

        return res.status(200).json({
            message: 'Sửa thông tin tác giả thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const removeAuthor = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Authors.findByIdAndDelete(id)
        // Kiểm tra xem id có tồn tại không
        if (!data) {
            return res.status(404).json({
                message: 'Tác giả không tồn tại'
            })
        }

        return res.status(200).json({
            message: 'Xóa tác giả thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
