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
