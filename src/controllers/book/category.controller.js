import Category from "../../models/book/category.model"
import { categorySchema } from "../../schema/book.schema";

export const getCategories = async (req, res) => {
    try {
        const data = await Category.find()
        if (data.length === 0) {
            return res.status(300).json({
                message: "Danh sách thể loại trống"
            })
        }

        return res.status(200).json({
            message: 'Lấy danh sách thể loại thành công',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Category.findById(id)
        // Kiểm tra xem id có tồn tại không
        if (!data) {
            return res.status(404).json({
                message: 'Thể loại không tồn tại'
            })
        }

        return res.status(200).json({
            message: 'Lấy thông tin thể loại thành công',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const addCategory = async (req, res) => {
    try {
        const { category_name, description } = req.body
        const { error } = await categorySchema.validateAsync(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message)
            return res.status(400).json({
                message: errors
            })
        }

        const category = await Category.create({
            category_name: category_name,
            description: description
        })
        if (!category) {
            return res.status(400).json({
                message: "Thêm thể loại không thành công"
            })
        }

        return res.status(200).json({
            message: 'Thêm thể loại thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const author_id = req.params.id
        const { category_name, description } = req.body
        const { error } = await categorySchema.validateAsync(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message)
            return res.status(400).json({
                message: errors
            })
        }

        const category = await Category.findByIdAndUpdate(author_id, {
            category_name: category_name,
            description: description
        })
        if (!category) {
            return res.status(400).json({
                message: "Thể loại không tồn tại"
            })
        }

        return res.status(200).json({
            message: 'Sửa thông tin thể loại thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const removeCategory = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Category.findByIdAndDelete(id)
        // Kiểm tra xem id có tồn tại không
        if (!data) {
            return res.status(404).json({
                message: 'Thể loại không tồn tại'
            })
        }

        return res.status(200).json({
            message: 'Xóa thể loại thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
