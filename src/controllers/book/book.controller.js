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
// Thêm chi tiết sách
export const createBookDetail = async (req, res) => {
    try {
        const { book_id, author_id, quantity, price, sale } = req.body
        const { error } = await bookDeltailSchema.validateAsync(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }

        const bookDetail = await BookDetail.create({
            book_id: book_id,
            author_id: author_id,
            quantity: quantity,
            price: price,
            sale: sale
        })
        if (!bookDetail) {
            return res.status(400).json({
                message: "Thêm chi tiết sách không thành công"
            })
        }
        return res.status(200).json({
            message: 'Thêm chi tiết sách thành công'
        })
    } catch (error) {
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
// Lấy danh sách book-detail
export const getBooksDetail = async (req, res) => {
    try {
        const bookDetail = await BookDetail.find()
        if (bookDetail.length === 0) {
            return res.status(300).json({
                message: "Danh sách book detail trống"
            })
        }
        return res.status(200).json({
            message: "Lấy danh sách book detail thành công",
            data: bookDetail
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
            return res.status(400).json({
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
// Lấy thông tin book detail
export const getBookDetailById = async (req, res) => {
    try {
        const id = req.params.id
        const bookDetail = await BookDetail.findById(id)
        if (!bookDetail) {
            return res.status(400).json({
                message: "Book-detail không tồn tại"
            })
        }
        return res.status(200).json({
            message: "Lấy thông tin book-detail thành công",
            data: bookDetail
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
        if (!bookInfo) {
            return res.status(400).json({
                message: "Sách không tồn tại"
            })
        }

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
// Sửa book-detail
export const updateBookDetail = async (req, res) => {
    try {
        const bookDetail_id = req.params.id
        const bookDetail = await BookDetail.findById(bookDetail_id)
        if (!bookDetail) {
            return res.status(400).json({
                message: "Book-detail không tồn tại"
            })
        }

        const book_id = req.body.book_id || bookDetail.book_id._id.toString()
        const author_id = req.body.author_id || bookDetail.author_id.map(author => author._id.toString())
        const quantity = req.body.quantity || bookDetail.quantity
        const price = req.body.price || bookDetail.price
        const sale = req.body.sale || bookDetail.sale

        const { error } = await bookDeltailSchema.validateAsync(
            { book_id, author_id, quantity, price, sale },
            { abortEarly: false }
        )
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }

        const bookDetailUpdate = await BookDetail.findByIdAndUpdate(
            bookDetail_id,
            {
                book_id, author_id, quantity, price, sale
            }
        )
        if (!bookDetailUpdate) {
            return res.status(400).json({
                message: "Cập nhật chi tiết sách không thành công"
            })
        }
        return res.status(200).json({
            message: 'Cập nhật chi tiết sách thành công'
        })
    } catch (error) {
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
// Xóa book-detail
export const removeBookDetail = async (req, res) => {
    try {
        const bookDetail_id = req.params.id
        const bookDetail = await BookDetail.findByIdAndDelete(bookDetail_id)

        if (!bookDetail) {
            return res.status(404).json({
                message: 'Chi tiết sách không tồn tại'
            })
        }

        return res.status(200).json({
            message: "Xóa chi tiết sách thành công"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
