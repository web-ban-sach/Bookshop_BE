import Book from '../../models/book/book.model'
import BookDetail from '../../models/book/bookDetail.model'
import { bookSchema, bookDeltailSchema } from '../../helper/book.schema';
import { v2 as cloudinary } from 'cloudinary';

export const createBook = async (req, res) => {
    let fileData
    try {
        fileData = req.file
        const { book_title, description, category_id, publisher_id, thumbnail } = req.body
        const { error } = await bookSchema.validateAsync({ ...req.body, thumbnail: fileData?.path }, { abortEarly: false })
        if (error) {
            if (fileData) {
                cloudinary.uploader.destroy(fileData.filename)
            }
            return res.status(400).json({
                message: error.details[0].message
            })
        }

        const book = await Book.create({
            book_title: book_title,
            description: description,
            category_id: category_id,
            publisher_id: publisher_id,
            thumbnail: fileData?.path
        })
        if (!book) {
            return res.status(400).json({
                message: "Thêm sách không thành công"
            })
        }

        return res.status(200).json({
            message: 'Thêm sách thành công'
        })
    } catch (error) {
        if (fileData) {
            cloudinary.uploader.destroy(fileData.filename)
        }
        res.status(500).json({
            message: error.message
        })
    }
}

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find()
        if (books.length === 0) {
            return res.status(300).json({
                message: "Danh sách book trống"
            })
        }
        return res.status(200).json({
            message: "Lấy danh sách book thành công",
            data: books
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getBookById = async (req, res) => {
    try {
        const id = req.params.id
        const book = await Book.findById(id)
        if (!book) {
            return res.status(404).json({
                message: "Sách không tồn tại"
            })
        }
        return res.status(200).json({
            message: "Lấy thông tin sách thành công",
            data: book
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateBook = async (req, res) => {
    let fileData
    try {
        const book_id = req.params.id
        const bookInfo = await Book.findById(book_id)
        fileData = req.file

        const book_title = req.body.book_title || bookInfo.book_title;
        const description = req.body.description || bookInfo.description;
        const category_id = req.body.category_id || bookInfo.category_id._id.toString();
        const publisher_id = req.body.publisher_id || bookInfo.publisher_id._id.toString();

        let thumbnail = bookInfo.thumbnail // Giữ nguyên thumbnail cũ
        if (fileData) {
            thumbnail = fileData.path // Sử dụng thumbnail mới nếu có
        }
        const { error } = await bookSchema.validateAsync(
            { book_title, description, category_id, publisher_id, thumbnail },
            { abortEarly: false }
        )
        if (error) {
            if (fileData) {
                cloudinary.uploader.destroy(fileData.filename)
            }
            return res.status(400).json({
                message: error.details[0].message
            })
        }

        const updateBook = await Book.findByIdAndUpdate(
            book_id,
            {
                book_title: book_title,
                description: description,
                category_id: category_id,
                publisher_id: publisher_id,
                thumbnail: thumbnail
            }
        )

        if (!updateBook) {
            return res.status(400).json({
                message: "Cập nhật sách không thành công"
            })
        }

        return res.status(200).json({
            message: 'Cập nhật sách thành công'
        })
    } catch (error) {
        if (fileData) {
            cloudinary.uploader.destroy(fileData.filename)
        }
        res.status(500).json({
            message: error.message
        })
    }
}

export const removeBook = async (req, res) => {
    try {
        const book_id = req.params.id
        const book = await Book.findByIdAndDelete(book_id)

        if (!book) {
            return res.status(404).json({
                message: 'Sách không tồn tại'
            })
        }

        return res.status(200).json({
            message: 'Xóa sách thành công'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
