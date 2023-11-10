import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/user.model";
import { registerSchema, loginSchema, changePasswordSchema } from "../helper/auth.schema";

export const register = async (req, res) => {
    try {
        const { username, fullname, phone, email, password, confirmPassword } = req.body;
        const { error } = registerSchema.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message)
            return res.status(400).json({
                message: errors
            })
        }
        // Kiểm tra xác nhận mật khẩu có trùng khớp không
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: 'Xác nhận mật khẩu không khớp'
            })
        }
        // Kiểm tra xem username có tồn tại không
        const existingUsername = await Users.findOne({ username })
        if (existingUsername) {
            return res.status(400).json({ message: 'Tài khoản đã được sử dụng' })
        }
        // Kiểm tra xem email có tồn tại không
        const existingEmail = await Users.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: 'Email đã được sử dụng' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await Users.create({
            username: username,
            fullname: fullname,
            email: email,
            phone: phone,
            password: hashedPassword
        })
        return res.status(201).json({ message: 'Đăng ký tài khoản thành công' })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const { error } = await loginSchema.validateAsync(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message)
            return res.status(400).json({
                message: errors
            })
        }
        // Kiểm tra tài khoản có tồn tại không
        const user = await Users.findOne({ username })
        if (!user) {
            return res.status(401).json({ message: 'Tài khoản không tồn tại' })
        }
        // Kiểm tra mật khẩu có đúng không
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Mật khẩu không chính xác' })
        }

        const token = jwt.sign({ userId: user._id }, '123456', { expiresIn: '1h' })
        return res.status(200).json({ message: 'Đăng nhập thành công', token })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body
        const userId = req.params.id
        const { error } = await changePasswordSchema.validateAsync(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                message: errors,
            });
        }
        // Kiểm tra xem mật khẩu hiện tại có khớp với mật khẩu của người dùng hay không
        const user = await Users.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' })
        }

        const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Mật khẩu hiện tại không đúng"
            })
        }

        // Mã hóa mật khẩu mới 
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await Users.updateOne({ _id: userId }, { password: hashedPassword })
        return res.status(200).json({
            message: 'Thay đổi mật khẩu thành công'
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
