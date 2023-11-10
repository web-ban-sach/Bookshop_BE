import Publisher from "../../models/book/publisher.model";
import { publisherSchema } from "../../schema/book.schema";

export const getPublishers = async (req, res) => {
    try {
        const data = await Publisher.find()
        if (data.length === 0) {
            return res.status(300).json({
                message: "Danh sách nhà xuất bản trống"
            })
        }

        return res.status(200).json({
            message: 'Lấy danh sách nhà xuất bản thành công',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getPublisherById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Publisher.findById(id)
        // Kiểm tra xem id có tồn tại không
        if (!data) {
            return res.status(404).json({
                message: 'Nhà xuất bản không tồn tại'
            })
        }

        return res.status(200).json({
            message: 'Lấy thông tin nhà xuất bản thành công',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const addPublisher = async (req, res) => {
    try {
        const { publisher_name, description } = req.body
        const { error } = await publisherSchema.validateAsync(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message)
            return res.status(400).json({
                message: errors
            })
        }

        const publisher = await Publisher.create({
            publisher_name: publisher_name,
            description: description
        })
        if (!publisher) {
            return res.status(400).json({
                message: "Thêm nhà xuất bản không thành công"
            })
        }

        return res.status(200).json({
            message: 'Thêm nhà xuất bản thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updatePublisher = async (req, res) => {
    try {
        const publisher_id = req.params.id
        const { publisher_name, description } = req.body
        const { error } = await publisherSchema.validateAsync(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message)
            return res.status(400).json({
                message: errors
            })
        }

        const publisher = await Publisher.findByIdAndUpdate(publisher_id, {
            publisher_name: publisher_name,
            description: description
        })
        if (!publisher) {
            return res.status(400).json({
                message: "Nhà xuất bản không tồn tại"
            })
        }

        return res.status(200).json({
            message: 'Sửa thông tin nhà xuất bản thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const removePublisher = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Publisher.findByIdAndDelete(id)
        // Kiểm tra xem id có tồn tại không
        if (!data) {
            return res.status(404).json({
                message: 'Nhà xuất bản không tồn tại'
            })
        }

        return res.status(200).json({
            message: 'Xóa nhà xuất bản thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
