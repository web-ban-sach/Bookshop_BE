import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const bookSchema = new mongoose.Schema(
    {
        book_title: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
            autopopulate: { select: "category_name" },
        },
        publisher_id: {
            type: mongoose.Types.ObjectId,
            ref: "Publisher",
            autopopulate: { select: "publisher_name" },
        },
        thumbnail: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

bookSchema.plugin(mongooseAutoPopulate)
export default mongoose.model("Book", bookSchema)
