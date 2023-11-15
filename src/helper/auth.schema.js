import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().required().regex(/^[a-z0-9]+$/).messages({
        "string.empty": "Tài khoản không được bỏ trống",
        "any.required": "Tài khoản là bắt buộc",
        'string.pattern.base': 'Tài khoản không được chứa kí tự đặc biệt'
    }),
    fullname: Joi.string().required().messages({
        "string.empty": "Họ tên không được bỏ trống",
        "any.required": "Họ tên là bắt buộc",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": "Email là bắt buộc",
        "string.email": "Email không hợp lệ"
    }),
    password: Joi.string().required().min(6).messages({
        "string.empty": "Mật khẩu không được để trống",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
        "any.required": "Mật khẩu là bắt buộc",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "string.empty": "Xác nhận mật khẩu không được để trống",
        "any.only": "Xác nhận mật khẩu không khớp",
        "any.required": "Xác nhận mật khẩu là bắt buộc",
    })
})

export const loginSchema = Joi.object({
    username: Joi.string().required().regex(/^[a-z0-9]+$/).messages({
        "string.empty": "Tài khoản không được bỏ trống",
        "any.required": "Tài khoản là bắt buộc",
        'string.pattern.base': 'Tài khoản không được chứa kí tự đặc biệt'
    }),
    password: Joi.string().required().min(6).messages({
        "string.empty": "Mật khẩu không được để trống",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
        "any.required": "Mật khẩu là bắt buộc",
    }),
})

export const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required().min(6).messages({
        "string.empty": "Mật khẩu hiện tại không được để trống",
        "string.min": "Mật khẩu hiện tại phải có ít nhất {#limit} ký tự",
        "any.required": "Mật khẩu hiện tại không được bỏ trống",
    }),
    newPassword: Joi.string().required().min(6).messages({
        "string.empty": "Mật khẩu mới không được để trống",
        "string.min": "Mật khẩu mới phải có ít nhất {#limit} ký tự",
        "any.required": "Mật khẩu mới không được bỏ trống",
    })
})
