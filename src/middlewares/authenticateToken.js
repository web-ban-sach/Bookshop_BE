import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: 'Không tìm thấy token xác thực' })
    }

    try {
        const decoded = jwt.verify(token, '123456')
        req.user = decoded.user
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Token không hợp lệ' })
    }
}
