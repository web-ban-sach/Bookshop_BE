import Joi from "joi";

export const registerValidate = Joi.object({
    username: Joi.string().required().messages({
        "string.empty": "Tài khoản không được bỏ trống",
        "any.required": "Tài khoản là bắt buộc"
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": "Email là bắt buộc",
        "string.email": "Email không hợp lệ"
    }),
    
})
