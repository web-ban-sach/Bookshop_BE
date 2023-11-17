import Joi from "joi";

export const authorSchema = Joi.object({
    author_name: Joi.string().required().messages({
        "string.empty": "Họ tên tác giả không được bỏ trống",
        "any.required": "Họ tên tác giả là bắt buộc",
    }),
    description: Joi.string().required().messages({
        "string.empty": "Mô tả về tác giả không được bỏ trống",
        "any.required": "Mô tả về tác giả là bắt buộc",
    })
})

export const categorySchema = Joi.object({
    category_name: Joi.string().required().messages({
        "string.empty": "Thể loại không được bỏ trống",
        "any.required": "Thể loại là bắt buộc",
    }),
    description: Joi.string().required().messages({
        "string.empty": "Mô tả về thể loại không được bỏ trống",
        "any.required": "Mô tả về thể loại là bắt buộc",
    })
})

export const publisherSchema = Joi.object({
    publisher_name: Joi.string().required().messages({
        "string.empty": "Nhà xuất bản không được bỏ trống",
        "any.required": "Nhà xuất bản là bắt buộc",
    }),
    description: Joi.string().required().messages({
        "string.empty": "Mô tả về nhà xuất bản không được bỏ trống",
        "any.required": "Mô tả về nhà xuất bản là bắt buộc",
    })
})

export const bookSchema = Joi.object({
    book_title: Joi.string().required().messages({
        "string.empty": "Tên sách không được bỏ trống",
        "any.required": "Tên sách là bắt buộc",
    }),
    description: Joi.string().required().messages({
        "string.empty": "Mô tả về sách không được bỏ trống",
        "any.required": "Mô tả về sách là bắt buộc",
    }),
    category_id: Joi.string().required().messages({
        "string.empty": "Id thể loại sách không được bỏ trống",
        "any.required": "Id thể loại sách là bắt buộc",
    }),
    publisher_id: Joi.string().required().messages({
        "string.empty": "Id nhà xuất bản không được bỏ trống",
        "any.required": "Id nhà xuất bản là bắt buộc",
    }),
    thumbnail: Joi.string().required().messages({
        "string.empty": "Ảnh về sách không được bỏ trống",
        "any.required": "Ảnh về sách là bắt buộc",
    }),
    author_id: Joi.array().items(Joi.string().messages({
        "string.empty": "Id tác giả không được bỏ trống",
        "any.required": "Id tác giả là bắt buộc",
    })).required(),
    quantity: Joi.number().min(0).required().messages({
        "string.empty": "Số lượng sách không được để trống",
        "string.min": "Số lượng sách phải lớn hơn 0",
        "any.required": "Số lượng sách là bắt buộc",
    }),
    old_price: Joi.number().min(0).required().messages({
        "string.empty": "Giá không được để trống",
        "string.min": "Giá phải lớn hơn 0",
        "any.required": "Giá là bắt buộc",
    }),
    sale: Joi.number(),
})
