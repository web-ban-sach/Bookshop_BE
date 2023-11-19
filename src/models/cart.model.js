import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const cartSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            autopopulate: { select: "_id" },
        },
        book_id: {
            type: mongoose.Types.ObjectId,
            ref: "Book",
            autopopulate: { select: "_id book_title new_price old_price quantity thumbnail" },
        },
        quantity: {
            type: Number,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

cartSchema.plugin(mongooseAutoPopulate)

export default mongoose.model("Cart", cartSchema)
