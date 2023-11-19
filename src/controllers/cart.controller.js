import Cart from "../models/cart.model"

export const getByUserId = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Cart.find({ user_id: id })
        let totalMoney = 0;
        let totalOldMoney = 0;

        const newData = data.map((cart) => {
            return {
                cart_id: cart._id,
                book_id: cart.book_id._id,
                book_title: cart.book_id.book_title,
                new_price: cart.book_id.new_price,
                thumbnail: cart.book_id.thumbnail,
                author_id: cart.book_id.author_id,
                category_name: cart.book_id.category_id.category_name,
                quantity: cart.quantity,
                totalQuantity: cart.book_id.quantity,
                totalNewPrice: cart.book_id.new_price * cart.quantity,
                totalOldPrice: cart.book_id.old_price * cart.quantity
            }
        })

        totalMoney = newData.reduce((total, item) => total + item.totalNewPrice, 0);
        totalOldMoney = newData.reduce((total, item) => total + item.totalOldPrice, 0);
        const discount = totalOldMoney - totalMoney
        return res.status(200).json({
            data: {
                cart: newData,
                totalMoney,
                totalOldMoney,
                discount
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const create = async (req, res) => {
    try {
        const body = req.body
        const book_id = body.book_id
        const hasCart = await Cart.findOne({ book_id })
        let data

        if (hasCart) {
            const quantity = parseInt(body.quantity) + parseInt(hasCart.quantity)
            data = await Cart.findOneAndUpdate({ book_id: book_id }, { quantity })
        } else {
            data = await Cart.create(body)
        }

        if (data) {
            return res.status(200).json({
                message: 'Tạo giỏ hàng thành công',
                data
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Cart.findByIdAndUpdate(id, req.body)

        if (data) {
            return res.status(200).json({
                message: 'Cập nhật giỏ hàng thành công',
                data
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const remove = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        if (id) {
            const removed = await Cart.findByIdAndDelete(id)
            if (!removed) {
                return res.status(400).json({
                    message: "Không tìm thấy giỏ hàng"
                })
            }
            return res.status(200).json({
                message: 'Xóa giỏ hàng thành công'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
