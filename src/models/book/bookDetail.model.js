import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const bookDetailSchema = new mongoose.Schema(
    {
        book_id: {
            type: mongoose.Types.ObjectId,
            ref: "Book",
            autopopulate: { select: "book_title" }
        },
        author_id: {
            type: mongoose.Types.ObjectId,
            ref: "Author",
            autopopulate: { select: "author_name" },
            require: true
        },
        image_id: {
            type: mongoose.Types.ObjectId,
            ref: "Image",
            autopopulate: { select: "image_url" },
            require: true
        },
        quantity: {
            type: Number,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        sale: {
            type: Number
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

bookDetailSchema.plugin(mongooseAutoPopulate)
export default mongoose.model("BookDetail", bookDetailSchema)
