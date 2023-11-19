import Joi from "joi";

export const commentSchema = Joi.object({
    user_id: Joi.string().required().messages({
        "string.empty": "User_id không được bỏ trống",
        "any.required": "User_id là bắt buộc",
    }),
    book_id: Joi.string().required().messages({
        "string.empty": "Book_id không được bỏ trống",
        "any.required": "Book_id là bắt buộc",
    }),
    description: Joi.string().required().max(250).messages({
        "string.empty": "Nội dung bình luận không được bỏ trống",
        "any.required": "Nội dung bình luận là bắt buộc",
        "string.max": "Nội dung bình luận không được vượt quá {#limit} ký tự",
    }),
    rate: Joi.number().required().messages({
        "string.empty": "Rate không được bỏ trống",
        "any.required": "Rate là bắt buộc",
    }),
}) 
