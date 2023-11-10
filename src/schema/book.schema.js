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
