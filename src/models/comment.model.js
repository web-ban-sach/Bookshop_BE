import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const commentSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            autopopulate: { select: "_id fullname avatar" },
            require: true
        },
        book_id: {
            type: mongoose.Types.ObjectId,
            ref: "Book",
            autopopulate: { select: "_id book_title" },
            require: true
        },
        description: {
            type: String,
            require: true
        },
        rate: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

commentSchema.plugin(mongooseAutoPopulate)

export default mongoose.model("Comment", commentSchema)
